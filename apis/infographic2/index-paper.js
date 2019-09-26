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
const startTimer = new Date().getTime();
const dom2 = new JSDOM(
  `<!DOCTYPE html><svg><text x="50" y="50" fill="#f55">Hello World too!</text></svg><img></img><canvas></canvas>`
);
const document = dom2.window.document;
const svgBase = dom2.window.document.querySelector("svg");
// const canvas = createCanvas(w || 100, h || 100);
const canvas = document.querySelector("canvas");

// ------paper
const paper = require("paper-jsdom-canvas");
// Create an empty project and a view for the canvas:
paper.setup(canvas);
// Create a Paper.js Path to draw a line into it:
var path = new paper.Path();
// Give the stroke a color
path.strokeColor = "red";
var start = new paper.Point(100, 100);
// Move to start and draw a line from there
path.moveTo(start);
// Note that the plus operator on Point objects does not work
// in JavaScript. Instead, we need to call the add() function:
path.lineTo(start.add([200, -50]));
// Draw the view now:
paper.view.draw();

var buf = canvas.toBuffer();
fs.writeFileSync("output-paper.png", buf);
console.log(
  `TIMER ${new Date().getTime() -
    startTimer} ms: complete rendering and export to png`
);
