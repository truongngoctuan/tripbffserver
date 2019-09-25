// const { createCanvas, loadImage } = require("canvas");
// const canvas = createCanvas(500, 500);
// const ctx = canvas.getContext("2d");

const PIXI = require("pixi-shim");

const app = new PIXI.Application(300, 300, { backgroundColor: 0x1099bb });
const canvas = app.view;
document.body.appendChild(app.view);

const basicText = new PIXI.Text("Basic text in pixi");
basicText.x = 50;
basicText.y = 100;
app.stage.addChild(basicText);

app.render();

function SetTimeoutReceiveMessage() {
  setTimeout(() => {
    var dataURL = canvas.toDataURL();
    require("fs").writeFile(
      "test-canvas-nodejs2.png",
      dataURL.replace(/^data:image\/png;base64,/, ""),
      "base64",
      function(err) {
        console.log(err);
      }
    );
    console.log(dataURL);

    // console.log(document.body);
    // console.log(canvas);
    // const fs = require('fs')
    // fs.writeFileSync('che.png', app.view.toBuffer());

    // const fs = require('fs')
    // const out = fs.createWriteStream('test-canvas-nodejs.png')
    // const stream = canvas.createPNGStream()
    // stream.pipe(out)
    // out.on('finish', () =>  console.log('The PNG file was created.'))
  }, 1000);
}
SetTimeoutReceiveMessage();

// const fs = require('fs')
// fs.writeFileSync('che.png', app.view.toBuffer());

// // Write "Awesome!"
// ctx.font = "30px Impact";
// ctx.rotate(0.1);
// ctx.fillText("Awesome!", 50, 100);

// // Draw line under text
// var text = ctx.measureText("Awesome!");
// ctx.strokeStyle = "rgba(0,0,0,0.5)";
// ctx.beginPath();
// ctx.lineTo(50, 102);
// ctx.lineTo(50 + text.width, 102);
// ctx.stroke();

// const fs = require('fs')
// const out = fs.createWriteStream('test-canvas-nodejs.png')
// const stream = Canvas.createPNGStream()
// stream.pipe(out)
// out.on('finish', () =>  console.log('The PNG file was created.'))
