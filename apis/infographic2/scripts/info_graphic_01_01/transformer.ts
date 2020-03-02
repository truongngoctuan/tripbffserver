import { InfographicConfig } from "../../configs";
import _ from "lodash";
export function preProcessInfographicConfig(
  config: InfographicConfig.Infographic,
  trip
) {
  return processBlock(config, trip);
}

type Transformer = NodeTransformer | LeafTransformer;

type NodeTransformer = {
  type: "node";
  preHandler: (c: InfographicConfig.Block) => InfographicConfig.Block;
  postHandler: (
    c: InfographicConfig.Block,
    children: InfographicConfig.Block[]
  ) => InfographicConfig.Block;
};

type LeafTransformer = {
  type: "leaf";
  handler: () => InfographicConfig.Block;
};

const transformers: { [id: string]: Transformer } = {
  container: {
    type: "node",
    preHandler: (c: InfographicConfig.Block) => c,
    postHandler: (
      c: InfographicConfig.Block,
      children: InfographicConfig.Block[]
    ) => {
      const containerBlock = c as InfographicConfig.ContainerBlock;
      if (!containerBlock.height) {
        containerBlock.height = _.sum(
          _.map(children, child => (child["height"] ? child["height"] : 0))
        );
      }
      return {
        ...containerBlock,
        blocks: children
      };
    }
  },
  locations: {
    type: "node",
    preHandler: (c: InfographicConfig.Block) => c,
    postHandler: (
      c: InfographicConfig.Block,
      children: InfographicConfig.Block[]
    ) => {
      const containerBlock = c as InfographicConfig.LocationsBlocks;
      return {
        ...containerBlock,
        blocks: children
      } as InfographicConfig.Block;
    }
  }
};

function processBlock(
  blockConfig: InfographicConfig.Block,
  trip
): InfographicConfig.Block {
  const transformer = transformers[blockConfig.type];
  if (!transformer) return blockConfig;
  
  if (transformer.type == "node") {
    transformer.preHandler(blockConfig);
  }

  let processedBlockConfigs: InfographicConfig.Block[] = [];
  if (!_.isEmpty((blockConfig as InfographicConfig.ContainerBlock).blocks)) {
    const containerBlockConfig = blockConfig as InfographicConfig.ContainerBlock;

    let childrenBlocks: InfographicConfig.Block[] = containerBlockConfig.blocks;

    for (var i = 0; i < childrenBlocks.length; i++) {
      var childBlock = childrenBlocks[i];

      var processedBlock = processBlock(childBlock, trip);
      processedBlockConfigs.push(processedBlock);
    }
  }

  if (transformer.type == "node") {
    return transformer.postHandler(blockConfig, processedBlockConfigs);
  }

  if (transformer.type == "leaf") {
    return transformer.handler();
  }

  return blockConfig;
}
