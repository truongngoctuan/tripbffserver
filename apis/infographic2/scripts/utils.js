const { registerFont } = require("canvas");
const paper = require("paper-jsdom-canvas");
const fs = require("fs");
// const path = require("path");
const _ = require("lodash");

registerFont("./fonts/Pfennig.ttf", { family: "Pfennig" });
registerFont("./fonts/Roboto-Regular.ttf", {
  family: "Roboto"
});
registerFont("./fonts/Roboto-Bold.ttf", {
  family: "Roboto",
  style: "normal",
  weight: "bold"
});

// todo: add this into node_modules/paper/dist/node/canvas.js
// todo: to load font into canvas
// try {
//   const a = require('canvas');
//   a.registerFont("./fonts/Pfennig.ttf", { family: "Pfennig" });
//   console.log("hello Canvas")
//   Canvas = a.Canvas;
// } catch(error) {
class CanvasAdaptor {
  constructor(w = 300, h = 300) {
    //use the canvas in paper so that we can magically register font
    var canvas = paper.Canvas(w, h);
    // var canvas = createCanvas(w, h);
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
    paper.setup(canvas);

    this.canvas = canvas;
    this.paper = paper;
  }
  draw() {
    this.paper.view.draw();
  }
  export(file) {
    const buf = paper.view.element.toBuffer();
    fs.writeFileSync(file, buf);
  }

  toBufferJpeg() {
    return paper.view.element.toBuffer("image/jpeg", {
      quality: 0.9
    });
  }

  toBufferPng() {
    return paper.view.element.toBuffer("image/png", {
      compressionLevel: 3,
      filters: paper.Canvas.PNG_FILTER_NONE
    });
  }

  resize(w, h) {
    paper.view.viewSize = new paper.Size(w, h);
  }
  // set name(name) {
  //   this._name = name.charAt(0).toUpperCase() + name.slice(1);
  // }
  // get name() {
  //   return this._name;
  // }
  async drawImage(source, position, options = {}, cb) {
    return new Promise((resolve, reject) => {
      var raster = source.startsWith("http")
        ? new paper.Raster(source)
        : new paper.Raster(loadLocalImage(source));

      raster.onLoad = function(e) {
        console.log("image loaded");
        const { width, height } = raster;
        raster.position = new paper.Point(
          position.x + width / 2,
          position.y + height / 2
        );

        if (options.width && options.height) {
          const scaleWidth = options.width / width;
          const scaleHeight = options.height / height;
          const scale = _.max([scaleWidth, scaleHeight]);
          console.log("scale", scale);
          raster.scale(scale);

          const deltaWidth = width - options.width;
          const deltaHeight = height - options.height;
          //setup image cover
          raster.position = new paper.Point(
            raster.position.x - deltaWidth / 2,
            raster.position.y - deltaHeight / 2
          );

          if (!options.clipPath) {
            // Use clipMask to create a custom polygon clip mask:
            var path = new paper.Path.Rectangle(
              position.x,
              position.y,
              options.width,
              options.height
            );
            path.clipMask = true;

            // It is better to add the path and the raster in a group (but not mandatory)
            var group = new paper.Group();
            group.addChild(raster);
            group.addChild(path);
          } else {
            var path2 = new paper.Path(options.clipPath);
            path2.position = new paper.Point(
              raster.position.x,
              raster.position.y
            );

            const scalePath = options.width / path2.bounds.width;
            path2.scale(scalePath);
            const deltaPathWidth = path2.bounds.width - options.width;
            raster.position = new paper.Point(
              raster.position.x - (deltaPathWidth > 0 ? deltaPathWidth / 2 : 0),
              raster.position.y - (deltaPathWidth > 0 ? deltaPathWidth / 2 : 0)
            );

            path2.style = {
              strokeColor: "#f00",
              strokeWidth: 2
            };

            path2.clipMask = true;

            // It is better to add the path and the raster in a group (but not mandatory)
            var group = new paper.Group();
            group.addChild(raster);
            group.addChild(path2);
          }
        }

        if (cb) {
          cb({
            // imageResult: raster,
            width: raster.width,
            height: raster.height
          });
        }
        resolve({ width: raster.width, height: raster.height });
      };

      raster.onError = err => {
        console.log("error on load image", err);
        reject(err);
      };
    });
  }

  drawBackground(backgroundColor) {
    var rect = new paper.Path.Rectangle({
      point: [0, 0],
      size: paper.view.size
    });
    rect.sendToBack();
    rect.fillColor = backgroundColor;
  }

  drawRect(options) {
    var rect = new paper.Path.Rectangle(
      new paper.Point(options.x, options.y),
      new paper.Size(options.width, options.height)
    );
    rect.fillColor = options.backgroundColor;
  }

  _drawText(text, position, options) {
    var fontSize = parseInt((options.fontSize || "30px").replace("px", ""));
    var textNode = new paper.PointText(
      new paper.Point(position.x, position.y + fontSize / 2)
    );

    // textNode.content = text;
    textNode.style = {
      fontSize,
      fillColor: options.color,
      fontFamily: options.font != "Roboto" ? "Pfennig" : "Roboto",
      fontWeight: options.fontWeight
    };

    return textNode;
  }

  drawText(text, position, options) {
    if (options.wrapNumber) {
      return this._drawTextWrap(text, position, options);
    }

    let textNode = this._drawText(text, position, options);
    textNode.content = text;

    // handle textAnchor manually
    this._textAnchor(textNode, options.textAnchor);

    return {
      bounds: {
        x: textNode.bounds.x,
        y: textNode.bounds.y,
        width: textNode.bounds.width,
        height: textNode.bounds.height
      }
    };
  }

  _drawTextWrap(text, position, options) {
    let textNode = this._drawText(text, position, options);
    // textNode.content = text;
    const width = options.wrapNumber;
    let words = text
      .trim()
      .split(/\s+/)
      .reverse();
    let previousLine = "";
    let word = "";

    while ((word = words.pop())) {
      textNode.content = previousLine + " " + word;
      if (textNode.bounds.width > width) {
        previousLine += "\n" + word;
      } else {
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
        height: textNode.bounds.height
      }
    };
  }

  _textAnchor(textNode, textAnchor) {
    // handle textAnchor manually
    if (textAnchor === "middle") {
      textNode.point = new paper.Point(
        textNode.point.x - textNode.bounds.width / 2,
        textNode.point.y
      );
    } else if (textAnchor === "end") {
      textNode.point = new paper.Point(
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
    let line = new paper.Path.Line(
      new paper.Point(options.x1, options.y1),
      new paper.Point(options.x2, options.y2)
    );
    line.style = {
      strokeColor: options.strokeColor,
      strokeWidth: options.strokeWidth
    };
  }
  drawCircle(options) {
    let circle = new paper.Path.Circle(
      new paper.Point(options.x, options.y),
      options.r
    );
    circle.style = {
      fillColor: options.fillColor
    };
  }
}

function loadLocalImage(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  var stringBase64 = Buffer.from(bitmap).toString("base64");
  return "data:image/png;base64," + stringBase64;
}

module.exports = {
  CanvasAdaptor
};
