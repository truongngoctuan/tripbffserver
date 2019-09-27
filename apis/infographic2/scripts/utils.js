const { loadImage, createCanvas } = require("canvas");
const canvg = require("canvg");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const paper = require("paper-jsdom-canvas");

class CanvasAdaptor {
  constructor(w = 500, h = 500) {
    var canvas2 = new paper.Canvas(w, h);

    // ------paper
    // Create an empty project and a view for the canvas:
    paper.setup(new paper.Size(w, h));

    this.canvas = canvas2;
    this.paper = paper;
  }
  draw() {
    this.paper.view.draw();
  }
  export(file) {
    const buf = paper.view.element.toBuffer();
    const fs = require("fs");
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
      var raster = new paper.Raster(source);
      raster.onLoad = function(e) {
        console.log(e);
        const { width, height } = raster;
        raster.position = new paper.Point(
          position.x + width / 2,
          position.y + height / 2
        );

        // console.log("size", raster.size);
        // console.log("resolution", raster.resolution);
        // raster.scale(1);
        // console.log("size", paper.view.size);
        // console.log("resolution", paper.view.resolution);
        cb({
          // imageResult: raster,
          width,
          height
        });
        resolve({ width, height });
      };
    });
  }
}

module.exports = {
  CanvasAdaptor
};
