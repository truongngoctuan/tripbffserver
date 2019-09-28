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
  resize(w, h) {
    paper.view.viewSize = new paper.Size(w, h);
  }
  // set name(name) {
  //   this._name = name.charAt(0).toUpperCase() + name.slice(1);
  // }
  // get name() {
  //   return this._name;
  // }
  async drawImage(source, position, cb) {
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
        // paper.project.activeLayer.fillColor = new paper.Color("#e3d1a2");
        // paper.project.activeLayer.blendMode = "normal";
        if (cb) {
          cb({
            // imageResult: raster,
            width,
            height
          });
        }
        resolve({ width, height });
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

  drawText(text, position, options) {
    var fontSize = parseInt((options.fontSize || "30px").replace("px", ""));
    var textNode = new paper.PointText(
      new paper.Point(position.x, position.y + fontSize / 2)
    );

    textNode.content = text;
    textNode.style = {
      fontSize,
      fillColor: options.color,
      fontFamily: options.font != "Roboto" ? "Pfennig" : "Roboto",
      fontWeight: options.fontWeight
    };

    return {
      bounds: {
        x: textNode.bounds.x,
        y: textNode.bounds.y,
        width: textNode.bounds.width,
        height: textNode.bounds.height
      }
    };

    // console.log("getFontStyle", textNode.style.getFontStyle());
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
