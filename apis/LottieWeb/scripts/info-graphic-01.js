//follow this demo
//      https://blog.adioma.com/how-to-create-timeline-infographic/

// draw basic shape
// https://www.dashingd3js.com/svg-basic-shapes-and-d3js

function drawBackground(svgBase) {
    svgBase.style('background-color', '#2E97A1');
}

async function drawSvg(svgBase, coordinate, uri, config) {
    var top = coordinate.top,
        left = coordinate.left,
        paddingLeftRight= coordinate.paddingLeftRight;

    d3.xml(uri).then(data => {
        var svgNode1 = data.documentElement;
        svgNode1.setAttribute("id", "svg1");
        svgBase.node().append(svgNode1);

        var innnerItem = svgBase.select("svg#svg1 circle");
        //var circle = innnerItem.select("circle");
        innnerItem
        .attr("cy", top)
        .attr("cx", left + paddingLeftRight + 100)
        .attr("r", 50)
        .attr("fill", "red"); 
    });
}

function drawImage(svgBase, coordinate, uri, config) {
    var top = coordinate.top,
        left = coordinate.left,
        paddingLeftRight= coordinate.paddingLeftRight;

    var svgCanvas = svgBase.append("svg:image");
    svgCanvas
    .attr('x', left + paddingLeftRight)
    .attr('y', top)
    .attr('width', config.width)
    .attr('height', config.height)
    .attr("xlink:href", uri)
}

function drawHeader(svgBase, trip) {

    let tripNameNode = drawText(svgBase, {
        top: 50,
        left: 100,
        paddingLeftRight: 20
    }, trip.name, { 
        color: "black",
        font: "serif",
        fontSize: "40px",
        textAnchor: "left",
        wrapNumber: 600 
    });
    let tripNameNodeBbox = tripNameNode.node().getBBox();

    let numberOfLocations = trip.locations.length,
        basicTripInfo = trip.numberOfDays + " days, " + numberOfLocations + " locations";

    drawText(svgBase, {
        top: tripNameNodeBbox.y + tripNameNodeBbox.height + 30,
        left: tripNameNodeBbox.x,
        paddingLeftRight: 0
    }, basicTripInfo, { 
        color: "black",
        font: "serif",
        fontSize: "30px",
        textAnchor: "left",
        wrapNumber: 400 
    });

    drawImage(svgBase, {
        top: tripNameNodeBbox.y,
        left: tripNameNodeBbox.x + tripNameNodeBbox.width,
        paddingLeftRight: 20
    }, './data/images/amazing.png', {
        width: 36,
        height: 36
    });

    drawSvg(svgBase, {
        top: tripNameNodeBbox.y,
        left: tripNameNodeBbox.x + tripNameNodeBbox.width + 100,
        paddingLeftRight: 20
    }, './data/images/rawDateComponent.svg',  {
        width: 72,
        height: 72
    });
}

function drawLocations(svgBase, nItems, nItemsPerRow) {    

    const w = 300,
        h = 300;
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

    const w = 300,
        h = 300;
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

function drawLocationDecorations(trip, svgBase, nItems, nItemsPerRow) {
    var svgCanvas = document.getElementById('info-graphic-base');
    let locations = trip.locations;

    const w = 300,
        h = 300;
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

        let location = locations[idx],
            locationName = location.name,
            feeling = location.feeling ? 'Feeling ' + location.feeling : "",
            activity = location.activity,
            nodeFeelingActivity = "";

        if (activity) nodeFeelingActivity = activity.toLowerCase();
        if (feeling) {
            feeling = feeling.toLowerCase();
            nodeFeelingActivity = nodeFeelingActivity ? nodeFeelingActivity + ', ' + feeling : feeling;
        }
        if (locationName) nodeFeelingActivity += ' at ';

        let feelingActivityNodeFirstDraw = drawText(svgBase, {
            top: y2 - 50,
            left: x2 - 20,
            w: w,
            h: h / 2 - locationMarginBottom,
            paddingLeftRight: 20
        }, nodeFeelingActivity, { 
            color: "black",
            font: "serif",
            fontSize: "20px",
            textAnchor: "middle",
            wrapNumber: 200 
        });

        let feelingActivityNodeFirstDrawBbox = feelingActivityNodeFirstDraw.node().getBBox();
        feelingActivityNodeFirstDraw.remove();

        let feelingActivityNode = drawText(svgBase, {
            top: y2 - feelingActivityNodeFirstDrawBbox.height,
            left: x2 - 20,
            w: w,
            h: h / 2 - locationMarginBottom,
            paddingLeftRight: 20
        }, nodeFeelingActivity, { 
            color: "black",
            font: "serif",
            fontSize: "20px",
            textAnchor: "middle",
            wrapNumber: 200 
        });

        let feelingActivityNodeBbox = feelingActivityNode.node().getBBox();

        drawText(svgBase, {
            top: y2 - feelingActivityNodeBbox.height - 30,
            left: x2 - 20,
            w: w,
            h: h / 2 - locationMarginBottom,
            paddingLeftRight: 20
        }, location.fromTime, { 
            color: "black",
            font: "serif",
            fontSize: "20px",
            textAnchor: "middle",
            wrapNumber: 200 
        });

        let nameElementWrapNumber = (idx + 1) % nItemsPerRow == 0 ? 130 : 200;

        let locationNameNode = drawText(svgBase, {
            top: y2 + 20,
            left: x2 - 20,
            w: w,
            h: h / 3 - locationMarginBottom,
            paddingLeftRight: 30
        }, locationName, { 
            color: "black",
            font: "serif",
            fontSize: "20px",
            textAnchor: "middle",
            wrapNumber: nameElementWrapNumber
        });

        let locationNameBbox = locationNameNode.node().getBBox();

        drawText(svgBase, {
            top: y2 + locationNameBbox.height + 30,
            left: x2 - 20,
            w: w,
            h: h / 3 - locationMarginBottom,
            paddingLeftRight: 30
        }, location.highlights.toLowerCase(), { 
            color: "black",
            font: "serif",
            fontSize: "20px",
            textAnchor: "middle",
            wrapNumber: 200 
        });

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

function drawText(svgBase, location, text, config) {
    const top = location.top;
    const left = location.left;
    const paddingLeftRight = location.paddingLeftRight;

    var svgCanvas = svgBase.append("text");
    svgCanvas
        .attr("y", top)
        .attr("x", left + paddingLeftRight)
        .attr('text-anchor', config.textAnchor)
        .attr("font-size", config.fontSize)
        .attr("font-family", config.font)
        .attr("fill", config.color)
        .attr("name", config.name)
        .text(text)
        .call(wrap, config.wrapNumber);
    return svgCanvas;
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


var N_ITEMS = 20;
const N_ITEMS_PER_ROW = 3;

const w = 300,
h = 300;
const c_paddingLeft = 50,
c_paddingRight = 50,
c_paddingTop = 100,
c_paddingBottom = 200;

function draw(trip) {

    N_ITEMS = trip.locations.length;

    var svgBase = d3.select("#info-graphic-base")
    .attr("width", c_paddingLeft + w * N_ITEMS_PER_ROW  + c_paddingRight)
    .attr("height", c_paddingTop + h * N_ITEMS / N_ITEMS_PER_ROW + c_paddingBottom);

    drawBackground(svgBase);
    drawHeader(svgBase, trip);
    drawPathBetweenLocationsInTheSameRow(svgBase, N_ITEMS, N_ITEMS_PER_ROW);
    drawLocations(svgBase, N_ITEMS, N_ITEMS_PER_ROW);
    drawLocationDecorations(trip, svgBase, N_ITEMS, N_ITEMS_PER_ROW);
}

window.draw = draw;