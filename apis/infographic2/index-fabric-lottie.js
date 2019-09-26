// http://fabricjs.com/fabric-intro-part-4
const fabric = require("fabric").fabric;
const fs = require("fs");
const { createCanvas } = require("canvas");
const canvg = require("canvg");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// ---const
const w = 128;
const h = 128;
const backgroundColor = "#e3d1a2";

// ------------ testing jsdom and import svg
const start = new Date().getTime();
const dom2 = new JSDOM(
  `<!DOCTYPE html><svg style=""></svg><canvas></canvas>`
);
const document = dom2.window.document;
const svgBase = dom2.window.document.querySelector("svg");
const canvas = createCanvas(w || 100, h || 100);
// const canvas = document.querySelector("canvas");

// ----use lottie-web
const lottie = require("lottie-node");
var animation = lottie("./data/B.json", canvas);

animation.playSegments([[5, 15]], true)

var fcanvas = new fabric.StaticCanvas(canvas, { width: 1000, height: 1000 });
const ctx = fcanvas.getContext("2d");

var text = new fabric.Text("Hello world", {
  left: 10,
  top: 10,
  fill: "#f55",
  angle: 15
});
fcanvas.add(text);
fcanvas.renderAll();

const out = fs.createWriteStream("output-fabric-lottie.png");
const stream = fcanvas.createPNGStream();
stream.pipe(out);
out.on("finish", () => {
  console.log(
    `TIMER ${new Date().getTime() -
      start} ms: complete fabric canvas to png`
  );
});
