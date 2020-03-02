import { InfographicConfig } from "../../../configs";
import { NodeTransformer } from "./typings";
import { overrideMissingHeight } from "./dynamic-property-override";
import _ from "lodash";

export const nodeLocation: NodeTransformer = {
  type: "node",
  preHandler: (c: InfographicConfig.Block) => c,
  postHandler: (
    c: InfographicConfig.Block,
    children: InfographicConfig.Block[],
    cursor
  ) => {
    const b = c as InfographicConfig.LocationBlock;
    return {
      block: overrideMissingHeight({
        ...b,
        blocks: children
      } as InfographicConfig.Block),
      cursor: _.merge({}, cursor, { location: cursor.location + 1 })
    };
  }
};