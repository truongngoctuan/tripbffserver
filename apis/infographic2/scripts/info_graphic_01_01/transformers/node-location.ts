import { InfographicConfig } from "../../../configs";
import { NodeTransformer } from "./typings";
import { overrideMissingHeight } from "./dynamic-property-override";
import _ from "lodash";

export const nodeLocation: NodeTransformer = {
  type: "node",
  preHandler: (c) => c,
  postHandler: (c, children, cursor) => {
    const b = c as InfographicConfig.LocationBlock;
    return {
      block: overrideMissingHeight({
        ...b,
        type: "container",
        blocks: children,
      } as InfographicConfig.Block),
      cursor: _.merge({}, cursor, { location: cursor.location + 1 }),
    };
  },
};
