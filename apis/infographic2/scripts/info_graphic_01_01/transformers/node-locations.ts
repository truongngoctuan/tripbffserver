import { InfographicConfig } from "../../../configs";
import { NodeTransformer } from "./typings";
import _ from "lodash";
import { overrideMissingHeight } from "./dynamic-property-override";
import { scaleBlock } from "../utils";

export const nodeLocations: NodeTransformer = {
  type: "node",
  preHandler: (c, trip, cursor) => {
    const containerBlockConfig = scaleBlock(
      c,
      cursor.scale
    ) as InfographicConfig.ContainerBlock;
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
      childBlockConfigs = _.cloneDeep(
        containerBlockConfig.blocks.slice(0, nLoc)
      );
    }

    return {
      block: {
        ...c,
        blocks: childBlockConfigs,
      } as InfographicConfig.Block,
      cursor,
    };
  },
  postHandler: (c, children, cursor) => {
    const b = c as InfographicConfig.LocationsBlocks;
    return {
      block: overrideMissingHeight({
        ...b,
        type: "container",
        blocks: children,
      } as InfographicConfig.Block),
      cursor,
    };
  },
};
