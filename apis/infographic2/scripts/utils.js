const { registerFont, loadImage, createCanvas } = require("canvas");
const canvg = require("canvg");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const paper = require("paper-jsdom-canvas");
const fs = require("fs");

process.env.PANGOCAIRO_BACKEND = 'fontconfig'
process.env.FONTCONFIG_PATH = __dirname

registerFont("./fonts/Roboto-Regular.ttf", { family: "Roboto" });

class CanvasAdaptor {
  constructor(w = 500, h = 500) {

    var canvas = createCanvas(w, h);
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'white';
ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'red';
    ctx.font = '20px "Roboto"'
    ctx.fillText('Everyone hates this font :(', 50, 50)
    // canvas.draw();
    const buf = canvas.toBuffer();
    fs.writeFileSync("output2.png", buf);
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
      // strokeColor: 'white',
      // selected: true
    });
    rect.sendToBack();
    rect.fillColor = backgroundColor;
  }

  drawText(text, position, options) {
    var fontSize = parseInt((options.fontSize || "30px").replace("px", ""));
    var textNode = new paper.PointText(
      new paper.Point(position.x, position.y + fontSize / 2)
    );
    console.log(options.font);
    console.log("fontFamily", textNode.fontFamily);
    textNode.content = text;
    textNode.style = {
      fontSize,
      fillColor: options.color,
      font: options.font == "Roboto" ? 'normal 64px "Roboto"' : 'normal 64px "Arial"',
      fontFamily: options.font,
      // fontFamily: "Roboto",
      // fontWeight: options.fontWeight
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
