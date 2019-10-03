const fs = require("fs");
const { loadImage, createCanvas } = require("canvas");
const canvg = require("canvg");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const paper = require("paper-jsdom-canvas");

// ---const
const w = 500;
const h = 500;
const backgroundColor = "#e3d1a2";

// ------------ testing jsdom and import svg
const startTimer = new Date().getTime();
const dom2 = new JSDOM(
  `<!DOCTYPE html><svg><text x="50" y="50" fill="#f55">Hello World too!</text></svg><img></img><canvas width="500" height="500"></canvas>`,
  {
    features: {
      FetchExternalResources: ["img"]
    }
  }
);
const document = dom2.window.document;
// const svgBase = dom2.window.document.querySelector("svg");
const canvas2 = document.querySelector("canvas");
// var canvas2 = new paper.Canvas(500, 500);

// ------use lottie-web
// lottie only work with this canvas, so after draw,
// I load this canvas as an raster image then render it in the main canvas
const lottie = require("lottie-node");
const canvas = createCanvas(w || 100, h || 100);
var animation = lottie("./data/B.json", canvas);
animation.playSegments([[5, 15]], true);

// ------paper
// Create an empty project and a view for the canvas:
paper.setup(canvas2);
// Create a Paper.js Path to draw a line into it:
var path = new paper.Path();
// Give the stroke a color
path.strokeColor = "red";
var start = new paper.Point(100, 300);
// Move to start and draw a line from there
path.moveTo(start);
// Note that the plus operator on Point objects does not work
// in JavaScript. Instead, we need to call the add() function:
path.lineTo(start.add([200, -50]));

//integrate
var raster = new paper.Raster({
  source: canvas.toDataURL(),
  position: paper.view.bounds.center
});
raster.onLoad = function(e) {
  console.log("sss.", e);
  paper.view.draw(); //this needed to render image with data, otherwise nothing will show

  // setTimeout(() => {
  // var base64Data = canvas2.toDataURL().replace(/^data:image\/png;base64,/, "");

  // fs.writeFile("test.png", base64Data, "base64", function(err) {
  //   console.log(err);
  // });

  // Saving the canvas to a file.
  buf = paper.view.element.toBuffer();
  fs.writeFileSync("output-paper-lottie.png", buf);
  console.log(
    `TIMER ${new Date().getTime() -
      startTimer} ms: complete rendering and export to png`
  );
  // }, 2000);
};

// // Draw the view now:
paper.view.draw();
