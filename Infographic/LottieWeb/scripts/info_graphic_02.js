//follow this demo
//      https://blog.adioma.com/how-to-create-timeline-infographic/

// draw basic shape
// https://www.dashingd3js.com/svg-basic-shapes-and-d3js

function drawHeader(svgBase, trip) {
    svgBase.append("rect")
        .attr("width", w)
        .attr("height", header_height)
        .attr("fill", "#d0363b");

    let tripNameNode = drawText(svgBase, {
        y: 50,
        x: w/2
    }, trip.name, { 
        color: "#e3d1a2",
        font: "Sans Serif",
        fontSize: "54px",
        textAnchor: "middle",
        textTransform: "uppercase",
        wrapNumber: w - paddingLeftRight * 2 
    });
    let tripNameNodeBbox = tripNameNode.node().getBBox();

    let numberOfLocations = trip.locations.length,
        basicTripInfo = trip.numberOfDays + " days, " + numberOfLocations + " locations";

    drawText(svgBase, {
        y: tripNameNodeBbox.y + tripNameNodeBbox.height + 40,
        x: w/2
    }, basicTripInfo, { 
        color: "#e3d1a2",
        font: "Sans Serif",
        fontSize: "42px",
        textAnchor: "middle",
        wrapNumber: w - paddingLeftRight * 2 
    });
}

function drawNodesInPath(svgBase) {
    var jsonCircles = [];

    for (let idx = 0; idx <= N_ITEMS; idx++) {
        let px = w / 2,
            py = header_height + c_paddingTop + idx * c_itemHeight;

        //outer circle
        jsonCircles.push({
            x_axis: px,
            y_axis: py,
            radius: 12,
            color: "red"
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

function drawPathBetweenLocations(svgBase) {
    var x1 = w / 2,
        y1 = header_height + c_paddingTop,
        x2 = x1,
        y2 = h - c_paddingBottom - footer_height;

    var pathElement = svgBase.append("line");
    pathElement
      .attr("x1", x1)
      .attr("x2", x2)
      .attr("y1", y1)
      .attr("y2", y2)  
      .style("stroke", "#121113")
      .style("stroke-width", "4");

      drawNodesInPath(svgBase);
}

function drawContent(svgBase, trip) {
    let startPoint_px = w / 2,
        startPoint_py = header_height + c_paddingTop;
    let globalConfig = {
        location: {
            paddingPath: 20,
            nameFontSize: "40px",
            nameFontFamily: "Sans Serif",
            nameColor: "#d0363b",
            descriptionFontSize: "32px",
            descriptionFontFamily: "Times Neue Roman",
            descriptionColor: "#121113",
            imageWidth: 220,
            imageHeight: 220
        }  
    };

    for (let idx = 0; idx < N_ITEMS; idx++) {
        let location = trip.locations[idx],
            locationName = capitalizeFirstLetter(location.name) + ".",
            feeling = location.feeling ? 'Feeling ' + location.feeling : "",
            activity = location.activity,
            highlights = location.highlights.toLowerCase(),
            nodeFeelingActivity = "";

        if (activity) nodeFeelingActivity = capitalizeFirstLetter(activity.toLowerCase());
        if (feeling) {
            feeling = capitalizeFirstLetter(feeling.toLowerCase());
            nodeFeelingActivity = nodeFeelingActivity ? nodeFeelingActivity + '. ' + feeling : feeling;
        }
        if (nodeFeelingActivity) nodeFeelingActivity += ".";

        if (highlights) highlights = capitalizeFirstLetter(highlights) + ".";

        if (idx % 2 == 0) {
            let locationName_px = startPoint_px + globalConfig.location.paddingPath,
                locationName_py = startPoint_py + idx * c_itemHeight;
            
            let locationNameNode = drawText(svgBase, {
                    y: locationName_py,
                    x: locationName_px
                }, locationName, { 
                    color: globalConfig.location.nameColor,
                    font: globalConfig.location.nameFontFamily,
                    fontSize: globalConfig.location.nameFontSize,
                    fontWeight: "bold",
                    textAnchor: "start",
                    textTransform: "uppercase",
                    wrapNumber: w / 2 - paddingLeftRight
                });
            let locationNameNodeBbox = locationNameNode.node().getBBox();
        
            let feelingActivityNode = drawText(svgBase, {
                y: locationNameNodeBbox.y + locationNameNodeBbox.height + 20,
                x: locationName_px
            }, nodeFeelingActivity, { 
                color: globalConfig.location.descriptionColor,
                font: globalConfig.location.descriptionFontFamily,
                fontSize: globalConfig.location.descriptionFontSize,
                textAnchor: "start",
                wrapNumber: w / 2 - paddingLeftRight 
            });
            let feelingActivityNodeBbox = feelingActivityNode.node().getBBox();
            drawText(svgBase, {
                y: feelingActivityNodeBbox.y + feelingActivityNodeBbox.height + 20,
                x: locationName_px
            }, highlights, { 
                color: globalConfig.location.descriptionColor,
                font: globalConfig.location.descriptionFontFamily,
                fontSize: globalConfig.location.descriptionFontSize,
                textAnchor: "start",
                wrapNumber: w / 2 - paddingLeftRight 
            });

            drawImage(svgBase, {
                y: locationName_py - 20,
                x: locationName_px - globalConfig.location.paddingPath * 4 - globalConfig.location.imageWidth 
            }, './data/images/02.jpg', {
                width: globalConfig.location.imageWidth,
                height: globalConfig.location.imageHeight
            });
        }
        else {
            let locationName_px = startPoint_px - globalConfig.location.paddingPath,
            locationName_py = startPoint_py + idx * c_itemHeight;
        
            let locationNameNode = drawText(svgBase, {
                    y: locationName_py,
                    x: locationName_px
                }, locationName, { 
                    color: globalConfig.location.nameColor,
                    font: globalConfig.location.nameFontFamily,
                    fontSize: globalConfig.location.nameFontSize,
                    fontWeight: "bold",
                    textAnchor: "end",
                    textTransform: "uppercase",
                    wrapNumber: w / 2 - paddingLeftRight 
                });
            let locationNameNodeBbox = locationNameNode.node().getBBox();
    
            let feelingActivityNode = drawText(svgBase, {
                y: locationNameNodeBbox.y + locationNameNodeBbox.height + 20,
                x: locationName_px
            }, nodeFeelingActivity, { 
                color: globalConfig.location.descriptionColor,
                font: globalConfig.location.descriptionFontFamily,
                fontSize: globalConfig.location.descriptionFontSize,
                textAnchor: "end",
                wrapNumber: w / 2 - paddingLeftRight 
            });

            let feelingActivityNodeBbox = feelingActivityNode.node().getBBox();
            drawText(svgBase, {
                y: feelingActivityNodeBbox.y + feelingActivityNodeBbox.height + 20,
                x: locationName_px
            }, highlights, { 
                color: globalConfig.location.descriptionColor,
                font: globalConfig.location.descriptionFontFamily,
                fontSize: globalConfig.location.descriptionFontSize,
                textAnchor: "end",
                wrapNumber: w / 2 - paddingLeftRight 
            });

            drawImage(svgBase, {
                y: locationName_py - 20,
                x: locationName_px + globalConfig.location.paddingPath * 4 
            }, './data/images/02.jpg', {
                width: globalConfig.location.imageWidth,
                height: globalConfig.location.imageHeight
            });
        }
    }
}

function drawFooter(svgBase) {
    let footerText = "MORE INFO: WWW.TRIPBFF.COM";

    svgBase.append("rect")
        .attr("x", 0)
        .attr("y", h - footer_height)
        .attr("width", w)
        .attr("height", footer_height)
        .attr("fill", "#d0363b");

    let footerInfoElement = drawText(svgBase, {
        y: h - footer_height / 2,
        x: w/2
    }, footerText, { 
        color: "#e3d1a2",
        font: "San Serif",
        fontSize: "24px",
        textAnchor: "middle",
        textTransform: "uppercase",
        wrapNumber: w - paddingLeftRight * 2
    });
}

// function drawBackground(svgBase) {
//     svgBase.style('background-color', '#2E97A1');
//     drawSvg(svgBase, "./data/images/rawLocationComponent.svg");
// }

// function drawSvg(svgBase, uri, coordinate, config) {
//     d3.xml(uri).then(data => {
//         var svgNode = data.documentElement;
//         svgNode.setAttribute("id", config.elementId);
//         svgBase.node().append(svgNode);

//         if (config.type == 'location') styleLocationItem(svgBase, coordinate, config);
//         else if (config.type == 'date') styleDateItem(svgBase, coordinate, config);
//     });
// }

function drawImage(svgBase, coordinate, uri, config) {
    var svgCanvas = svgBase.append("svg:image");
    svgCanvas
    .attr('x', coordinate.x)
    .attr('y', coordinate.y)
    .attr('width', config.width)
    .attr('height', config.height)
    .attr("xlink:href", uri)
    .attr("clip-path", "circle(38%)")
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function drawText(svgBase, coordinate, text, config) {
    var svgCanvas = svgBase.append("text");
    svgCanvas
        .attr("y", coordinate.y)
        .attr("x", coordinate.x)
        .style('text-anchor', config.textAnchor)
        .style('text-transform', config.textTransform)
        .style("font-size", config.fontSize)
        .style("font-weight", config.fontWeight)
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
          let lineText = line.join(" ");

          if (lineNumber == 1) {
            // make sure infographic only have maximum 2 lines for each text
            lineText = lineText + "...";
            tspan.text(lineText);
            break;
          }

          tspan.text(lineText);
          line = [word];
          tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    });
  }


var N_ITEMS = 4;

const header_height = 170;
const footer_height = 70;
const paddingLeftRight = 10;
const c_paddingTop = 60,
      c_paddingBottom = 20,
      c_itemHeight = 250;

const w = 940;
var h = header_height + c_paddingTop + c_itemHeight * N_ITEMS + c_paddingBottom + footer_height;

function draw(trip) {

    N_ITEMS = trip.locations.length;

    var svgBase = d3.select("#info-graphic-base")
    .attr("width", w)
    .attr("height", h)
    .style('background-color', '#e3d1a2');

    drawHeader(svgBase, trip);
    drawPathBetweenLocations(svgBase);
    drawContent(svgBase, trip);
    drawFooter(svgBase);
}

window.draw = draw;