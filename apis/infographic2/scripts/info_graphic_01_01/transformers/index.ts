import { InfographicConfig } from "../../../configs";
import _ from "lodash";
import { Transformer, CursorTransformer } from "./typings";
import { nodeContainer } from "./node-container";
import { nodeLocations } from "./node-locations";
import { nodeLocation } from "./node-location";
import { leafText } from "./leaf-text";

export function preProcessInfographicConfig(
  config: InfographicConfig.Infographic,
  trip
) {
  const defaultCursor: CursorTransformer = {
    level: 0,
    location: 0
  };

  return processBlock(config, trip, defaultCursor).block;
}

const transformers: { [id: string]: Transformer } = {
  container: nodeContainer,
  locations: nodeLocations,
  location: nodeLocation,
  text: leafText
};

export function processBlock(
  blockConfig: InfographicConfig.Block,
  trip,
  cursor: CursorTransformer
): { block: InfographicConfig.Block; cursor: CursorTransformer } {
  const transformer = transformers[blockConfig.type];
  if (transformer) {
    if (transformer.type == "node") {
      blockConfig = transformer.preHandler(blockConfig, trip);
    }
  }

  let nextCursor = _.merge({}, cursor, { level: cursor.level + 1 });
  let processedBlockConfigs: InfographicConfig.Block[] = [];
  if (!_.isEmpty((blockConfig as InfographicConfig.ContainerBlock).blocks)) {
    const containerBlockConfig = blockConfig as InfographicConfig.ContainerBlock;

    let childrenBlocks: InfographicConfig.Block[] = containerBlockConfig.blocks;

    for (var i = 0; i < childrenBlocks.length; i++) {
      var childBlock = childrenBlocks[i];

      var processResult = processBlock(childBlock, trip, nextCursor);
      processedBlockConfigs.push(processResult.block);
      nextCursor = processResult.cursor;
    }
  }

  if (transformer) {
    if (transformer.type == "node") {
      const postHandlerResult = transformer.postHandler(
        blockConfig,
        processedBlockConfigs,
        nextCursor
      );
      nextCursor = postHandlerResult.cursor;

      return {
        block: postHandlerResult.block,
        cursor: _.merge({}, cursor, { location: nextCursor.location })
      };
    }

    if (transformer.type == "leaf") {
      return {
        block: transformer.handler(blockConfig, trip, cursor),
        cursor: _.merge({}, cursor, { location: nextCursor.location })
      };
    }
  }

  return {
    block: blockConfig,
    cursor: _.merge({}, cursor, { location: nextCursor.location })
  };
}
