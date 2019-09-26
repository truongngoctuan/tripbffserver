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
  `<!DOCTYPE html><svg><text x="50" y="50" fill="#f55">Hello World too!</text></svg><img></img><canvas></canvas>`
);
const document = dom2.window.document;
const svgBase = dom2.window.document.querySelector("svg");
const canvas = createCanvas(w || 100, h || 100);

console.log(svgBase);
// ----use lottie-web
const lottie = require("lottie-node");
var animation = lottie("./data/B.json", canvas);

animation.playSegments([[5, 15]], true)

// todo: does not need
// link svg into node-canvas
const svgContent = svgBase.outerHTML;
console.log(svgBase.outerHTML);
canvg(canvas, svgContent, { ignoreMouse: true, ignoreAnimation: true });

console.log(canvas.toDataURL());
var buf = canvas.toBuffer();
fs.writeFileSync("output-lottie-web.png", buf);
console.log(
  `TIMER ${new Date().getTime() -
    start} ms: complete rendering and export to png`
);
