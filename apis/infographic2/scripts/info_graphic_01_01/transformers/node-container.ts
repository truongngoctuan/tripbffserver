import { InfographicConfig } from "../../../configs";
import { NodeTransformer, CursorTransformer } from "./typings";
import { overrideMissingHeight } from "./dynamic-property-override";
import { scaleBlock } from "../utils";
import _ from "lodash";

export const nodeContainer: NodeTransformer = {
  type: "node",
  preHandler: (c, trip, cursor) => ({
    block: scaleBlock(c, getScale(c, cursor)),
    cursor: _.merge({}, cursor, { scale: getScale(c, cursor) }),
  }),
  postHandler: (b, children, cursor) => {
    const containerBlock = b as InfographicConfig.ContainerBlock;

    const scale = containerBlock["scale"]
      ? containerBlock["scale"] * cursor.scale
      : cursor.scale;
    return {
      block: overrideMissingHeight({
        ...containerBlock,
        blocks: children,
      }),
      cursor: _.merge(cursor, { scale }),
    };
  },
};

function getScale(
  c: any,
  cursor: CursorTransformer
) {
  return c["scale"] ? c["scale"] * cursor.scale : cursor.scale;
}
