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

var viewBox = "0 0" + " " + w + " " + h;
svgBase.setAttribute("width", w);
svgBase.setAttribute("height", h);
svgBase.setAttribute("viewBox", viewBox);
svgBase.setAttribute("preserveAspectRatio", "xMinYMin meet");

svgBase.style.backgroundColor = backgroundColor;

var svgText = document.createElement("text");
var svgTextContent = document.createTextNode("hello world 3");
svgText.appendChild(svgTextContent);
svgText.setAttribute("y", 10);
svgText.setAttribute("x", 10);
svgText.setAttribute("fill", "white");
svgBase.appendChild(svgText);

// link svg into node-canvas
const svgContent = svgBase.outerHTML;
console.log(svgBase.outerHTML);
canvg(canvas, svgContent, { ignoreMouse: true, ignoreAnimation: true });

var buf = canvas.toBuffer();
fs.writeFileSync("output-node-canvas.png", buf);
console.log(
  `TIMER ${new Date().getTime() -
    start} ms: complete rendering and export to png`
);
