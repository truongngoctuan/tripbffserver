"use strict";

const { registerFont } = require("canvas");
import paperShim from "./paper-jsdom-canvas";
import { Canvas } from "canvas";
// import paper from "paper";
import fs from "fs";
// const path = require("path");
import _ from "lodash";

registerFont("./fonts/Pfennig.ttf", { family: "a" });
registerFont("./fonts/Roboto-Regular.ttf", {
  family: "Roboto",
});
registerFont("./fonts/Roboto-Bold.ttf", {
  family: "Roboto",
  style: "normal",
  weight: "bold",
});

registerFont("./fonts/Nunito-Regular.ttf", {
  family: "Nunito",
});

registerFont("./fonts/Nunito-SemiBoldItalic.ttf", {
  family: "Nunito",
  weight: "600",
  style: "italic",
});

registerFont("./fonts/Nunito-Bold.ttf", {
  family: "Nunito",
  weight: "bold",
});
registerFont("./fonts/Nunito-Black.ttf", {
  family: "Nunito",
  weight: "900",
});

// todo: add this into node_modules/paper/dist/node/canvas.js
// todo: to load font into canvas
// try {
//   const a = require('canvas');
//   a.registerFont("./fonts/Pfennig.ttf", { family: "Pfennig" });
//   console.log("hello Canvas")
//   Canvas = a.Canvas;
// } catch(error) {
export class CanvasAdaptor {
  canvas: Canvas;
  paper: paper.PaperScope;

  constructor(w = 300, h = 300) {
    //use the canvas in paper so that we can magically register font
    const canvas: Canvas = (paperShim as any).Canvas(w, h);
    // var canvas: Canvas = createCanvas(w, h);
    // const ctx = canvas.getContext("2d");
    // ctx.fillStyle = "white";
    // ctx.fillRect(0, 0, w, h);
    // console.log(ctx.font);
    // ctx.fillStyle = "red";
    // ctx.font = '10px "sans-serif"';
    // ctx.fillText("123456789 Everyoooooooooooone hates this font :(", 50, 50);
    // ctx.font = '10px "Roboto"';
    // ctx.fillText("123456789 Everyoooooooooooone hates this font :(", 50, 80);
    // ctx.font = '10px "Pfennig"';
    // ctx.fillText("123456789 Everyoooooooooooone hates this font :(", 50, 120);
    // const buf = canvas.toBuffer();
    // fs.writeFileSync("output2.png", buf);
    // ------paper
    // Create an empty project and a view for the canvas:
    paperShim.setup(canvas as any);

    this.canvas = canvas;
    this.paper = paperShim;
  }

  //use this method to go directly to a lower layer, reduce complexity of setup custom draw methods
  getPaper() {
    return this.paper;
  }

  getCanvasViewElement() {
    return (paperShim.view.element as any) as Canvas;
  }

  draw() {
    this.paper.view.update();
  }
  export(file) {
    const buf = this.getCanvasViewElement().toBuffer();
    fs.writeFileSync(file, buf);
  }

  toBufferJpeg() {
    return this.getCanvasViewElement().toBuffer("image/jpeg", {
      quality: 0.9,
    });
  }

  toBufferPng() {
    return this.getCanvasViewElement().toBuffer("image/png", {
      compressionLevel: 3,
      filters: this.canvas.PNG_FILTER_NONE,
    });
  }

  resize(w, h) {
    paperShim.view.viewSize = new paperShim.Size(w, h);
  }
  // set name(name) {
  //   this._name = name.charAt(0).toUpperCase() + name.slice(1);
  // }
  // get name() {
  //   return this._name;
  // }
  async drawImage(
    source,
    position,
    options: {
      width?: number;
      height?: number;
      clipPath?: string;
      rotate?: number;
    } = {}
  ) {
    return new Promise((resolve, reject) => {
      const raster = source.startsWith("http")
        ? new paperShim.Raster(source)
        : new paperShim.Raster(loadLocalImage(source));

      let group: paper.Group;

      const startDownload = new Date().getTime();
      // console.log(`image ${source} loading`)

      raster.onLoad = function (e) {
        // console.log("image loaded");
        const { width, height } = raster;
        raster.position = new paperShim.Point(
          position.x + width / 2,
          position.y + height / 2
        );

        if (options.width && options.height) {
          const scaleWidth = options.width / width;
          const scaleHeight = options.height / height;
          const scale = _.max([scaleWidth, scaleHeight]) as number;
          // console.log("scale", scale);
          raster.scale(scale);

          const deltaWidth = width - options.width;
          const deltaHeight = height - options.height;
          //setup image cover
          raster.position = new paperShim.Point(
            raster.position.x - deltaWidth / 2,
            raster.position.y - deltaHeight / 2
          );

          group = new paperShim.Group();
          if (!options.clipPath) {
            // Use clipMask to create a custom polygon clip mask:
            const path = new paperShim.Path.Rectangle(
              new paperShim.Point(position.x, position.y),
              new paperShim.Size(options.width, options.height)
            );
            path.clipMask = true;

            // It is better to add the path and the raster in a group (but not mandatory)
            group.addChild(raster);
            group.addChild(path);
          } else {
            const path2 = new paperShim.Path(options.clipPath);
            path2.position = new paperShim.Point(
              raster.position.x,
              raster.position.y
            );

            const scalePath = options.width / path2.bounds.width;
            path2.scale(scalePath);
            const deltaPathWidth = path2.bounds.width - options.width;
            raster.position = new paperShim.Point(
              raster.position.x - (deltaPathWidth > 0 ? deltaPathWidth / 2 : 0),
              raster.position.y - (deltaPathWidth > 0 ? deltaPathWidth / 2 : 0)
            );

            path2.style = {
              ...path2.style,
              strokeColor: new paperShim.Color("#f00"),
              strokeWidth: 2,
            };

            path2.clipMask = true;

            // It is better to add the path and the raster in a group (but not mandatory)
            group.addChild(raster);
            group.addChild(path2);
          }
        }

        if (options.rotate) {
          group.rotate(options.rotate);
        }

        resolve({
          width: group ? group.bounds.width : raster.bounds.width,
          height: group ? group.bounds.height : raster.bounds.height,
        });
      };

      raster.onError = (err) => {
        console.log("error on load image", err);
        reject(err);
      };
    });
  }

  drawBackground(backgroundColor) {
    const rect = new paperShim.Path.Rectangle({
      point: [0, 0],
      size: paperShim.view.size,
    });
    rect.sendToBack();
    rect.fillColor = backgroundColor;
  }

  drawRect(options) {
    const rect = new paperShim.Path.Rectangle(
      new paperShim.Point(options.x, options.y),
      new paperShim.Size(options.width, options.height)
    );
    rect.fillColor = options.backgroundColor;
  }

  _drawText(text, position, options) {
    const fontSize = parseInt((options.fontSize || "30px").replace("px", ""));
    const textNode = new paperShim.PointText(
      new paperShim.Point(position.x, position.y + fontSize)
    );

    // textNode.content = text;
    textNode.style = {
      ...textNode.style,
      fontSize,
      fillColor: options.color,
      fontFamily: options.font,
      fontWeight: options.fontWeight,
    };

    return textNode;
  }

  drawText(text, position, options) {
    if (options.wrapNumber) {
      return this._drawTextWrap(text, position, options);
    }

    const textNode = this._drawText(text, position, options);
    textNode.content = text;

    // handle textAnchor manually
    this._textAnchor(textNode, options.textAnchor);

    return {
      bounds: {
        x: textNode.bounds.x,
        y: textNode.bounds.y,
        width: textNode.bounds.width,
        height: textNode.bounds.height,
      },
    };
  }

  _drawTextWrap(text, position, options) {
    const textNode = this._drawText(text, position, options);
    // textNode.content = text;
    const width = options.wrapNumber;
    const words = text.trim().split(/\s+/).reverse();
    let previousLine = "";
    let word = "";
    let lineNumber = 0;

    while ((word = words.pop())) {
      textNode.content = previousLine + " " + word;

      if (textNode.bounds.width > width) {
        lineNumber++;

        if (lineNumber >= options.numberOfLines) {
          previousLine += "...";
          break;
        }          
        else
          previousLine += "\n" + word;        
      }
      else {
        previousLine = _.isEmpty(previousLine)
          ? word
          : previousLine + " " + word;
      }      
    }

    textNode.content = previousLine;

    // handle textAnchor manually
    this._textAnchor(textNode, options.textAnchor);

    return {
      bounds: {
        x: textNode.bounds.x,
        y: textNode.bounds.y,
        width: textNode.bounds.width,
        height: textNode.bounds.height,
      },
    };
  }

  _textAnchor(textNode, textAnchor) {
    // handle textAnchor manually
    if (textAnchor === "middle") {
      textNode.point = new paperShim.Point(
        textNode.point.x - textNode.bounds.width / 2,
        textNode.point.y
      );
    } else if (textAnchor === "end") {
      textNode.point = new paperShim.Point(
        textNode.point.x - textNode.bounds.width,
        textNode.point.y
      );
    }
  }

  // async drawTextWrap(text, position, options) {
  //   const widthToWrap = options.width;
  //   // let textNode = this._drawText(text, position, options);
  //   // let newText = text;
  //   let svgText2 = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  //   <style>
  //     text  { font: italic 12px serif; font-size: 20px; }
  //     tspan { font: bold 10px sans-serif; fill: red; }
  //   </style>

  //   <text x="${position.x}" y="${position.y}" class="small">
  //     You are aaaa
  //     <tspan>not</tspan>
  //     a banana!
  //     a banana!
  //     a banana!
  //     a banana!
  //   </text>
  // </svg>`;
  //   return new Promise((resolve, reject) => {
  //     paper.project.importSVG(svgText2, textNode => {
  //       // console.log(textNode);
  //       var fontSize = parseInt((options.fontSize || "30px").replace("px", ""));
  //       textNode.style = {
  //         fontSize,
  //         fillColor: options.color,
  //         fontFamily: options.font != "Roboto" ? "Pfennig" : "Roboto",
  //         fontWeight: options.fontWeight,
  //       };
  //       textNode.fillColor ="#f00"

  //       textNode.position = new paper.Point(
  //         position.x,
  //         position.y + fontSize / 2
  //       );
  //       resolve({
  //         bounds: {
  //           x: textNode.bounds.x,
  //           y: textNode.bounds.y,
  //           width: textNode.bounds.width,
  //           height: textNode.bounds.height
  //         }
  //       });
  //     });
  //   });
  // }
  drawLine(options) {
    const line = new paperShim.Path.Line(
      new paperShim.Point(options.x1, options.y1),
      new paperShim.Point(options.x2, options.y2)
    );
    line.style = {
      ...line.style,
      strokeColor: options.strokeColor,
      strokeWidth: options.strokeWidth,
    };
  }
  drawCircle(options) {
    const circle = new paperShim.Path.Circle(
      new paperShim.Point(options.x, options.y),
      options.r
    );
    circle.style = {
      ...circle.style,
      fillColor: options.fillColor,
    };
  }
}

function loadLocalImage(file) {
  // read binary data
  const bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  const stringBase64 = Buffer.from(bitmap).toString("base64");
  return "data:image/png;base64," + stringBase64;
}

module.exports = {
  CanvasAdaptor,
};
