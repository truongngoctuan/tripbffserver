import { InfographicConfig } from "../../../configs";
import _ from "lodash";
import { overrideMissingHeight } from "./dynamic-property-override";
import { Transformer, CursorTransformer } from "./typings";
import { nodeContainer } from "./node-container";
import { leafText } from "./leaf-text";

export function preProcessInfographicConfig(
  config: InfographicConfig.Infographic,
  trip
) {
  const defaultCursor: CursorTransformer = {
    level: 0,
    location: 0
  };

  return processBlock(config, trip, defaultCursor);
}

const transformers: { [id: string]: Transformer } = {
  container: nodeContainer,
  locations: {
    type: "node",
    preHandler: (c: InfographicConfig.Block) => c,
    postHandler: (
      c: InfographicConfig.Block,
      children: InfographicConfig.Block[]
    ) => {
      const b = c as InfographicConfig.LocationsBlocks;
      return {
        ...b,
        blocks: children
      } as InfographicConfig.Block;
    }
  },
  location: {
    type: "node",
    preHandler: (c: InfographicConfig.Block) => c,
    postHandler: (
      c: InfographicConfig.Block,
      children: InfographicConfig.Block[]
    ) => {
      const b = c as InfographicConfig.LocationBlock;
      return overrideMissingHeight({
        ...b,
        blocks: children
      } as InfographicConfig.Block);
    }
  },
  text: leafText
};

function processBlock(
  blockConfig: InfographicConfig.Block,
  trip,
  cursor: CursorTransformer
): InfographicConfig.Block {
  const transformer = transformers[blockConfig.type];
  if (transformer) {
    if (transformer.type == "node") {
      transformer.preHandler(blockConfig);
    }
  }

  const nextCursor = _.merge({}, cursor, { level: cursor.level + 1 });
  let processedBlockConfigs: InfographicConfig.Block[] = [];
  if (!_.isEmpty((blockConfig as InfographicConfig.ContainerBlock).blocks)) {
    const containerBlockConfig = blockConfig as InfographicConfig.ContainerBlock;

    let childrenBlocks: InfographicConfig.Block[] = containerBlockConfig.blocks;

    for (var i = 0; i < childrenBlocks.length; i++) {
      var childBlock = childrenBlocks[i];

      var processedBlock = processBlock(childBlock, trip, nextCursor);
      processedBlockConfigs.push(processedBlock);
    }
  }

  if (transformer) {
    if (transformer.type == "node") {
      return transformer.postHandler(blockConfig, processedBlockConfigs);
    }

    if (transformer.type == "leaf") {
      return transformer.handler(blockConfig, trip, cursor);
    }
  }

  return blockConfig;
}
