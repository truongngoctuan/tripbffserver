// import { InfographicConfig } from "../../../configs";
// import { renderInfographic } from "../generic";
// import { CanvasAdaptor } from "../../utils";
// import fs from "fs";
// import { Trip } from "../../models/trip";

// describe("node transformer", () => {
//   test("simple container node", async () => {
//     //Arrange
//     const config: InfographicConfig.Infographic = {
//       width: 1280,
//       backgroundColor: "black",
//       type: "container",
//       blocks: [
//         {
//           type: "container",
//           backgroundColor: "grey",
//           height: 100,
//           blocks: []
//         },
//         {
//           type: "container",
//           backgroundColor: "green",
//           height: 1000,
//           blocks: []
//         }
//       ]
//     };

//     const data = {} as Trip;

//     // Act
//     let canvasAdaptor = new CanvasAdaptor();
//     await renderInfographic(canvasAdaptor, config, {}, data);
//     canvasAdaptor.draw();
//     let result = await canvasAdaptor.toBufferJpeg();
//     // fs.writeFileSync("output.jpeg", buf);

//     // Assert
//     expect(result).toBeDefined();
//   });
// });
