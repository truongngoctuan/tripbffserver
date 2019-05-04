//follow this demo
//      https://blog.adioma.com/how-to-create-timeline-infographic/

// draw basic shape
// https://www.dashingd3js.com/svg-basic-shapes-and-d3js

function drawLocations(svgBase, nItems, nItemsPerRow) {

    // var jsonCircles = [{
    //     "x_axis": 30,
    //     "y_axis": 30,
    //     "radius": 20,
    //     "color": "green"
    // },
    // {
    //     "x_axis": 70,
    //     "y_axis": 70,
    //     "radius": 20,
    //     "color": "purple"
    // },
    // {
    //     "x_axis": 110,
    //     "y_axis": 100,
    //     "radius": 20,
    //     "color": "red"
    // }
    // ];

    const w = 200,
        h = 200;
    const c_paddingLeft = 50,
        c_paddingRight = 50,
        c_paddingTop = 100,
        c_paddingBottom = 100;

    var jsonCircles = [];
    for (let idx = 0; idx < nItems; idx++) {
        var iItemInRow = idx % nItemsPerRow;
        var iRow = (idx - iItemInRow) / nItemsPerRow;

        if (iRow % 2 == 0) {
            px = c_paddingLeft + w / 2 + iItemInRow * w;
        } else {
            px = c_paddingLeft + w / 2 + (nItemsPerRow - 1 - iItemInRow) * w;
        }
        py = c_paddingTop + h / 2 + iRow * h;

        //outer circle
        jsonCircles.push({
            x_axis: px,
            y_axis: py,
            radius: 12,
            color: "white"
        })

        //inner circle
        jsonCircles.push({
            x_axis: px,
            y_axis: py,
            radius: 8,
            color: "green"
        })

    }

    var circles = svgBase.selectAll("circle")
        .data(jsonCircles)
        .enter()
        .append("circle");

    var circleAttributes = circles
        .attr("cx", function (d) {
            return d.x_axis;
        })
        .attr("cy", function (d) {
            return d.y_axis;
        })
        .attr("r", function (d) {
            return d.radius;
        })
        .style("fill", function (d) {
            return d.color;
        });
}

function drawPathBetweenLocationsInTheSameRow(svgBase, nItems, nItemsPerRow) {

    const w = 200,
        h = 200;
    const c_paddingLeft = 50,
        c_paddingRight = 50,
        c_paddingTop = 100,
        c_paddingBottom = 100;
    const nRow = nItems / nItemsPerRow;

    var x1, y1, x2, y2;
    var context = d3.path();

    for (let idx = 0; idx < nItems; idx++) {
        var iItemInRow = idx % nItemsPerRow;
        var iRow = (idx - iItemInRow) / nItemsPerRow;

        var px, py;

        if (iRow % 2 == 0) {
            px = c_paddingLeft + w / 2 + iItemInRow * w;
        } else {
            px = c_paddingLeft + w / 2 + (nItemsPerRow - 1 - iItemInRow) * w;
        }
        py = c_paddingTop + h / 2 + iRow * h;

        x2 = px;
        y2 = py;

        if (x1) {

            if (iRow % 2 != 0 && iItemInRow == 0) {
                //draw a curve between rows
                context.bezierCurveTo(x1 + w * 2 / 3, y1, x2 + w * 2 / 3, y2, x2, y2);
            } else if (iRow % 2 == 0 && iItemInRow == 0) {
                console.log("hey")
                //draw a curve between rows
                context.bezierCurveTo(x1 - w * 2 / 3, y1, x2 - w * 2 / 3, y2, x2, y2);
            } else {
                //Draw the line
                context.lineTo(x2, y2);

            }
        } else {
            context.moveTo(px, py);
        }

        x1 = px;
        y1 = py;
    }

    var pathElement = svgBase.append("path");
    pathElement.attr("d", context.toString());
    pathElement.attr("stroke-width", 4)
        .attr("stroke", "black")
        .attr("fill", "none");

}

function drawLocationDecorations(svgBase, nItems, nItemsPerRow) {
    var svgCanvas = document.getElementById('info-graphic-base');

    const w = 200,
        h = 200;
    const c_paddingLeft = 50,
        c_paddingRight = 50,
        c_paddingTop = 100,
        c_paddingBottom = 100;
    const nRow = nItems / nItemsPerRow;

    var x1, y1, x2, y2;
    var context = d3.path();

    for (let idx = 0; idx < nItems; idx++) {
        var iItemInRow = idx % nItemsPerRow;
        var iRow = (idx - iItemInRow) / nItemsPerRow;

        var px, py;

        if (iRow % 2 == 0) {
            px = c_paddingLeft + w / 2 + iItemInRow * w;
        } else {
            px = c_paddingLeft + w / 2 + (nItemsPerRow - 1 - iItemInRow) * w;
        }
        py = c_paddingTop + h / 2 + iRow * h;

        x2 = px;
        y2 = py;

        const locationMarginBottom = 12;
        drawText(svgBase, {
            top: y2 - 20,
            left: x2 - 20,
            w: w,
            h: h / 2 - locationMarginBottom,
            paddingLeftRight: 20
        }, "13/12/2018", "black", "serif");

        drawText(svgBase, {
            top: y2 + 20,
            left: x2 - 20,
            w: w,
            h: h / 3 - locationMarginBottom,
            paddingLeftRight: 30
        }, "Nha Trang", "black", "sans-serif");


        drawText(svgBase, {
            top: y2 + 50,
            left: x2 - 20,
            w: w,
            h: h / 3 - locationMarginBottom,
            paddingLeftRight: 30
        }, "Lorem Ipsum is simply dummy text of the printing industry.", "black", "serif");

        x1 = px;
        y1 = py;
    }

}

function drawLottie(svgBase, location) {
    const top = location.top;
    const left = location.left;
    const w = location.w;
    const h = location.h;
    const paddingLeftRight = location.paddingLeftRight;

    var svgCanvas = svgBase.append("svg");
    svgCanvas
        // .attr("viewBox", "0 0 1000 2000")
        .attr("y", top)
        .attr("x", left + paddingLeftRight)
        .attr("width", w - paddingLeftRight * 2)
        .attr("height", h)
        ;
        
      var animation = bodymovin.loadAnimation({
        container: svgCanvas.node(),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: './data/octopus-image/data.json',
        // name: 'svgB',
        // rendererSettings: {
        //   className: 'svgBold'
        // }
    });

    animation.goToAndStop(60, true);
    //console.log(animation);
    // animation.playSegments([
    //     [5, 6]
    // ], true)
}

function drawText(svgBase, location, text, color, font) {
    const top = location.top;
    const left = location.left;
    const paddingLeftRight = location.paddingLeftRight;

    var svgCanvas = svgBase.append("text");
    svgCanvas
        .attr("y", top)
        .attr("x", left + paddingLeftRight)
        .attr('text-anchor', 'middle')
        .attr("font-size", "20px")
        .attr("font-family", font)
        .attr("fill", color)
        .text(text)
        .call(wrap, 150);
}

function wrap(text, width) {
    text.each(function() {
      var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          x = text.attr("x"),
          dy = 0.35,
          tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    });
  }


const N_ITEMS = 20;
const N_ITEMS_PER_ROW = 3;

const w = 200,
h = 300;
const c_paddingLeft = 50,
c_paddingRight = 50,
c_paddingTop = 100,
c_paddingBottom = 100;

function draw() {

    var svgBase = d3.select("#info-graphic-base")
    .attr("width", c_paddingLeft + w * N_ITEMS_PER_ROW  + c_paddingRight)
    .attr("height", c_paddingTop + h * N_ITEMS / N_ITEMS_PER_ROW + c_paddingBottom);

    drawPathBetweenLocationsInTheSameRow(svgBase, N_ITEMS, N_ITEMS_PER_ROW);
    drawLocations(svgBase, N_ITEMS, N_ITEMS_PER_ROW);
    drawLocationDecorations(svgBase, N_ITEMS, N_ITEMS_PER_ROW);
}

window.draw = draw;