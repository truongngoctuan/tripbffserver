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
// const canvas = createCanvas(w || 100, h || 100);
// const canvas = document.querySelector("canvas");

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
// svgText.setAttribute("fill", "#f55");
svgBase.appendChild(svgText);



// var buf = canvas.toBuffer();
// fs.writeFileSync("output-node-canvas.png", buf);
// console.log(
//   `TIMER ${new Date().getTime() -
//     start} ms: complete rendering and export to png`
// );

var canvasf = new fabric.StaticCanvas(null, { width: 1000, height: 1000 });
const ctx = canvasf.getContext("2d");

// todo not wure if we can actually make sure of this method,
// todo the only case that it can be useful is when you want to integrate lottie-web
// link svg into fabric canvas
const svgContent = svgBase.outerHTML;
console.log(svgBase.outerHTML);
canvg(canvasf, svgContent, { ignoreMouse: true, ignoreAnimation: true });

var text = new fabric.Text("Hello world", {
  left: 10,
  top: 10,
  fill: "#f55",
  angle: 15
});
canvasf.add(text);
canvasf.renderAll();

const out = fs.createWriteStream("output-fabric.png");
const stream = canvasf.createPNGStream();
stream.pipe(out);
out.on("finish", () => {
  console.log(
    `TIMER ${new Date().getTime() -
      start} ms: complete fabric canvas to png`
  );
});
