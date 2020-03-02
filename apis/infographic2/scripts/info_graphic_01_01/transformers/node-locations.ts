import { InfographicConfig } from "../../../configs";
import { NodeTransformer } from "./typings";
import _ from "lodash";
import { overrideMissingHeight } from "./dynamic-property-override";

export const nodeLocations: NodeTransformer = {
  type: "node",
  preHandler: (c: InfographicConfig.Block, trip) => {
    const containerBlockConfig = c as InfographicConfig.ContainerBlock;
    let childBlockConfigs: InfographicConfig.Block[] = [];
    // nLoc > nLocConfig, clone locConfig until n == nLoc
    // else keep just enough logConfig
    const nLoc = trip.locations.length;
    const nLocConfig = containerBlockConfig.blocks.length;
    if (nLoc > nLocConfig) {
      for (let iLoc = 0; iLoc < nLoc; iLoc++) {
        const locConfig = containerBlockConfig.blocks[iLoc % nLocConfig];
        childBlockConfigs.push(_.cloneDeep(locConfig));
      }
    } else {
      childBlockConfigs = _.cloneDeep(containerBlockConfig.blocks.slice(0, nLoc));
    }

    return {
      ...c,
      type: "container",
      blocks: childBlockConfigs
    } as InfographicConfig.Block;
  },
  postHandler: (
    c: InfographicConfig.Block,
    children: InfographicConfig.Block[],
    cursor
  ) => {
    const b = c as InfographicConfig.LocationsBlocks;
    return {
      block: overrideMissingHeight({
        ...b,
        blocks: children
      } as InfographicConfig.Block),
      cursor
    };
  }
};
