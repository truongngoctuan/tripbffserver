import { InfographicConfig } from "../../../configs";
import _ from "lodash";
import { Transformer, CursorTransformer } from "./typings";
import { nodeContainer } from "./node-container";
import { nodeLocations } from "./node-locations";
import { nodeLocation } from "./node-location";
import { leafText } from "./leaf-text";
import { leafLocationImage } from "./leaf-location-image";

const transformers: { [id: string]: Transformer } = {
  container: nodeContainer,
  locations: nodeLocations,
  location: nodeLocation,
  text: leafText,
  "location-image": leafLocationImage,
};

export function processBlock(
  blockConfig: InfographicConfig.TripBlock,
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
  const processedBlockConfigs: InfographicConfig.Block[] = [];
  if (!_.isEmpty((blockConfig as InfographicConfig.ContainerBlock).blocks)) {
    const containerBlockConfig = blockConfig as InfographicConfig.ContainerBlock;

    const childrenBlocks: InfographicConfig.Block[] =
      containerBlockConfig.blocks;

    for (let i = 0; i < childrenBlocks.length; i++) {
      const childBlock = childrenBlocks[i];

      const processResult = processBlock(childBlock, trip, nextCursor);
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
        cursor: _.merge({}, cursor, { location: nextCursor.location }),
      };
    }

    if (transformer.type == "leaf") {
      return {
        block: transformer.handler(blockConfig, trip, cursor),
        cursor: _.merge({}, cursor, { location: nextCursor.location }),
      };
    }
  }

  return {
    block: blockConfig as InfographicConfig.Block,
    cursor: _.merge({}, cursor, { location: nextCursor.location }),
  };
}

export function preProcessInfographicConfig(
  config: InfographicConfig.TripInfographic,
  settings: any,
  trip
) {
  const defaultCursor: CursorTransformer = {
    level: 0,
    location: 0,
    ...settings,
  };

  return processBlock(config, trip, defaultCursor).block;
}
