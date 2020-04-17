import { InfographicConfig } from "../../../configs";
import _ from "lodash";
import { Transformer, CursorTransformer } from "./typings";
import { nodeContainer } from "./node-container";
import { nodeLocations } from "./node-locations";
import { nodeLocation } from "./node-location";
import { leafText } from "./leaf-text";
import { leafLocationImage } from "./leaf-location-image";
import { leafDefault } from "./leaf-default";
import { leafSVG } from "./leaf-svg";

const transformers: { [id: string]: Transformer } = {
  container: nodeContainer,
  locations: nodeLocations,
  location: nodeLocation,

  text: leafText,
  "location-image": leafLocationImage,
  svg: leafSVG,
};

export function processBlock(
  blockConfig: InfographicConfig.TripBlock,
  trip,
  cursor: CursorTransformer
): { block: InfographicConfig.Block; cursor: CursorTransformer } {
  const transformer = transformers[blockConfig.type];

  // leaf handler
  if (transformer && transformer.type == "leaf") {
    return {
      block: transformer.handler(blockConfig, trip, cursor),
      cursor,
    };
  }

  //leaf default handler
  if (!transformer && !blockConfig["blocks"]) {
    return {
      block: leafDefault.handler(blockConfig, trip, cursor),
      cursor,
    };
  }

  if (!transformer)
    throw new Error("missing transformer for node type " + blockConfig.type);

  let nextCursor: CursorTransformer = cursor;

  // pre node handler
  if (transformer.type == "node") {
    const preHandlerResult = transformer.preHandler(blockConfig, trip, cursor);
    blockConfig = preHandlerResult.block;
    nextCursor = preHandlerResult.cursor;
    console.log("pre handler node ", blockConfig);
    console.log("cursor", nextCursor);
  }

  nextCursor = _.merge({}, nextCursor, { level: cursor.level + 1 });
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

  // post node handler
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

export function preProcessInfographicConfig(
  config: InfographicConfig.TripInfographic,
  settings: { scale: number },
  trip
) {
  const defaultCursor: CursorTransformer = {
    level: 0,
    location: 0,
    ...settings,
  };

  return processBlock(config, trip, defaultCursor).block;
}
