// http://fabricjs.com/fabric-intro-part-4
const fabric = require("fabric").fabric;
const fs = require("fs");
const { Image } = require("canvas");
var btoa = require("btoa");
const canvg = require("canvg");

// ------------ testing jsdom and import svg
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom2 = new JSDOM(
  `<!DOCTYPE html><svg><text x="50" y="50" fill="#f55">Hello World too!</text></svg><img></img><canvas></canvas>`
);
const canvasEl = dom2.window.document.querySelector("canvas");
// const img = dom2.window.document.querySelector("img");
// const img = new Image();
const svgBase = dom2.window.document.querySelector("svg");

// const dom = new JSDOM(`<!DOCTYPE html><svg></svg>`);
// const svgBase = dom.window.document.querySelector("svg");
console.log(svgBase);
const w = 1280;
const h = 1280;
const backgroundColor = "#e3d1a2";

var viewBox = "0 0" + " " + w + " " + h;
svgBase.setAttribute("width", w);
svgBase.setAttribute("height", h);
svgBase.setAttribute("viewBox", viewBox);
svgBase.setAttribute("preserveAspectRatio", "xMinYMin meet");

svgBase.style.backgroundColor = backgroundColor;

var buf = canvas.toBuffer();
fs.writeFileSync("output-node-canvas.png", buf);

console.log(svgBase.outerHTML);

// get svg data
// var xml = new XMLSerializer().serializeToString(svg);

// make it base64
// var svg64 = btoa(canvasEl.outerHTML);
// var b64Start = "data:image/svg+xml,";

// prepend a "header"
// var image64 = b64Start + svg64;

// set it as the source of the img element

// ------------

const start = new Date().getTime();
var canvas = new fabric.Canvas(canvasEl, { width: 1000, height: 1000 });
canvg(canvas, svgBase.outerHTML, {
  ignoreMouse: true,
  ignoreAnimation: true,
  ImageClass: Image
});
const ctx = canvas.getContext("2d");
// canvas.loadImage(svgBase.outerHTML, 0, 0);
setTimeout(() => {
  var text = new fabric.Text("Hello world", {
    left: 100,
    top: 100,
    fill: "#f55",
    angle: 15
  });
  canvas.add(text);
  canvas.renderAll();

  console.log("bored");

  const out = fs.createWriteStream("output.png");
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on("finish", () => {
    console.log(
      `complete rendering and export to png in ${new Date().getTime() -
        start} ms`
    );
    console.log("The PNG file was created.");
  });
}, 1000);
