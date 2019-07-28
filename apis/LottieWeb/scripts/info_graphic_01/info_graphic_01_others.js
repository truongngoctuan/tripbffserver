//follow this demo
//      https://blog.adioma.com/how-to-create-timeline-infographic/

// draw basic shape
// https://www.dashingd3js.com/svg-basic-shapes-and-d3js

var draw_01_others = (function() {
    
    var globalConfig = {};    
    var w = 940;
    var h = 1500;

    function drawBackground(svgBase, backgroundColor) {
        svgBase.style('background-color', backgroundColor);
    }
    
    function drawHeader(svgBase, trip) {
        svgBase.append("rect")
            .attr("width", w)
            .attr("height", globalConfig.header.height)
            .attr("fill", globalConfig.header.background);
    
        let tripNameNode = drawText(svgBase, {
            y: globalConfig.header.tripName.paddingTop,
            x: w/2
        }, trip.name, { 
            color: globalConfig.header.tripName.color,
            font: globalConfig.header.tripName.font,
            fontSize: globalConfig.header.tripName.fontSize,
            textAnchor: globalConfig.header.tripName.textAnchor,
            textTransform: globalConfig.header.tripName.textTransform,
            wrapNumber: w - globalConfig.infographic.paddingLeftRight * 2 
        });
        let tripNameNodeBbox = tripNameNode.node().getBBox();
    
        let numberOfLocations = trip.locations.length,
            basicTripInfo = trip.numberOfDays + " days, " + numberOfLocations + " locations";
    
        drawText(svgBase, {
            y: tripNameNodeBbox.y + tripNameNodeBbox.height + globalConfig.header.tripDescription.paddingTop,
            x: w/2
        }, basicTripInfo, { 
            color: globalConfig.header.tripDescription.color,
            font: globalConfig.header.tripDescription.font,
            fontSize: globalConfig.header.tripDescription.fontSize,
            textAnchor: globalConfig.header.tripDescription.textAnchor,
            wrapNumber: w - globalConfig.infographic.paddingLeftRight * 2 
        });
    }
    
    function drawNodesInPath(svgBase, numberOfLocations) {
        var jsonCircles = [];
    
        for (let idx = 0; idx <= numberOfLocations; idx++) {
            let px = w / 2,
                py = globalConfig.header.height + 
                    globalConfig.content.paddingTop + 
                    idx * globalConfig.content.itemHeight;
    
            //outer circle
            jsonCircles.push({
                x_axis: px,
                y_axis: py,
                radius: globalConfig.content.circleRadius,
                color: globalConfig.content.nodeColor
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
    
    function drawPathBetweenLocations(svgBase, numberOfLocations) {
        var x1 = w / 2,
            y1 = globalConfig.header.height + globalConfig.content.paddingTop,
            x2 = x1,
            y2 = h - globalConfig.content.paddingBottom - globalConfig.footer.height;
    
        var pathElement = svgBase.append("line");
        pathElement
          .attr("x1", x1)
          .attr("x2", x2)
          .attr("y1", y1)
          .attr("y2", y2)  
          .style("stroke", globalConfig.content.pathStroke)
          .style("stroke-width", globalConfig.content.pathStrokeWidth);
    
          drawNodesInPath(svgBase, numberOfLocations);
    }
    
    function drawContent(svgBase, trip, numberOfLocations) {
        let startPoint_px = w / 2,
            startPoint_py = globalConfig.header.height + globalConfig.content.paddingTop;   
    
        let locationImageCoordinates = [];

        for (let idx = 0; idx < numberOfLocations; idx++) {
            let location = trip.locations[idx],
                locationName = capitalizeFirstLetter(location.name) + ".",
                feeling = location.feeling ? 'Feeling ' + location.feeling : "",
                activity = location.activity,
                highlights = location.highlights.toLowerCase(),
                nodeFeelingActivity = "";
            let url = location.signedUrl;
    
            if (activity) nodeFeelingActivity = capitalizeFirstLetter(activity.toLowerCase());
            if (feeling) {
                feeling = capitalizeFirstLetter(feeling.toLowerCase());
                nodeFeelingActivity = nodeFeelingActivity ? nodeFeelingActivity + '. ' + feeling : feeling;
            }
            if (nodeFeelingActivity) nodeFeelingActivity += ".";
    
            if (highlights) highlights = capitalizeFirstLetter(highlights) + ".";
    
            if (idx % 2 == 0) {
                let locationName_px = startPoint_px + globalConfig.location.paddingPath,
                    locationName_py = startPoint_py + idx * globalConfig.content.itemHeight;
                
                let locationNameNode = drawText(svgBase, {
                        y: locationName_py,
                        x: locationName_px
                    }, locationName, { 
                        color: globalConfig.location.name.color,
                        font: globalConfig.location.name.font,
                        fontSize: globalConfig.location.name.fontSize,
                        fontWeight: globalConfig.location.name.fontWeight,
                        textAnchor: globalConfig.location.name.textAnchorEven,
                        textTransform: globalConfig.location.name.textTransform,
                        wrapNumber: w / 2 - globalConfig.location.paddingPath - globalConfig.infographic.paddingLeftRight
                    });
                let locationNameNodeBbox = locationNameNode.node().getBBox();
                let nextElementYCoordinate = locationNameNodeBbox.y + locationNameNodeBbox.height + globalConfig.location.linePadding;

                if (nodeFeelingActivity) {
                    let feelingActivityNode = drawText(svgBase, {
                        y: nextElementYCoordinate,
                        x: locationName_px
                    }, nodeFeelingActivity, { 
                        color: globalConfig.location.description.color,
                        font: globalConfig.location.description.font,
                        fontSize: globalConfig.location.description.fontSize,
                        textAnchor: globalConfig.location.description.textAnchorEven,
                        wrapNumber: w / 2 - globalConfig.location.paddingPath - globalConfig.infographic.paddingLeftRight * 2
                    });
                    let feelingActivityNodeBbox = feelingActivityNode.node().getBBox();
                    nextElementYCoordinate = feelingActivityNodeBbox.y + feelingActivityNodeBbox.height + globalConfig.location.linePadding;
                }
                
                drawText(svgBase, {
                    y: nextElementYCoordinate,
                    x: locationName_px
                }, highlights, { 
                    color: globalConfig.location.description.color,
                    font: globalConfig.location.description.font,
                    fontSize: globalConfig.location.description.fontSize,
                    textAnchor: globalConfig.location.description.textAnchorEven,
                    wrapNumber: w / 2 - globalConfig.location.paddingPath - globalConfig.infographic.paddingLeftRight * 2
                });
    
                locationImageCoordinates.push({
                    x: locationName_px - globalConfig.location.paddingPath * 3 - globalConfig.location.image.svgWidth,
                    y: locationName_py,
                    id: location.locationId
                });
            }
            else {
                let locationName_px = startPoint_px - globalConfig.location.paddingPath,
                locationName_py = startPoint_py + idx * globalConfig.content.itemHeight;
            
                let locationNameNode = drawText(svgBase, {
                        y: locationName_py,
                        x: locationName_px
                    }, locationName, { 
                        color: globalConfig.location.name.color,
                        font: globalConfig.location.name.font,
                        fontSize: globalConfig.location.name.fontSize,
                        fontWeight: globalConfig.location.name.fontWeight,
                        textAnchor: globalConfig.location.name.textAnchorOdd,
                        textTransform: globalConfig.location.name.textTransform,
                        wrapNumber: w / 2 - globalConfig.location.paddingPath - globalConfig.infographic.paddingLeftRight 
                    });
                let locationNameNodeBbox = locationNameNode.node().getBBox();
                let nextElementYCoordinate = locationNameNodeBbox.y + locationNameNodeBbox.height + globalConfig.location.linePadding;

                if (nodeFeelingActivity) {
                    let feelingActivityNode = drawText(svgBase, {
                        y: nextElementYCoordinate,
                        x: locationName_px
                    }, nodeFeelingActivity, { 
                        color: globalConfig.location.description.color,
                        font: globalConfig.location.description.font,
                        fontSize: globalConfig.location.description.fontSize,
                        textAnchor: globalConfig.location.description.textAnchorOdd,
                        wrapNumber: w / 2 - globalConfig.location.paddingPath - globalConfig.infographic.paddingLeftRight * 2
                    });
        
                    let feelingActivityNodeBbox = feelingActivityNode.node().getBBox();
                    nextElementYCoordinate = feelingActivityNodeBbox.y + feelingActivityNodeBbox.height + globalConfig.location.linePadding;
                }
                
                drawText(svgBase, {
                    y: nextElementYCoordinate,
                    x: locationName_px
                }, highlights, { 
                    color: globalConfig.location.description.color,
                    font: globalConfig.location.description.font,
                    fontSize: globalConfig.location.description.fontSize,
                    textAnchor: globalConfig.location.description.textAnchorOdd,
                    wrapNumber: w / 2 - globalConfig.location.paddingPath - globalConfig.infographic.paddingLeftRight * 2
                });
    
                locationImageCoordinates.push({
                    x: locationName_px + globalConfig.location.paddingPath * 3,
                    y: locationName_py,
                    id: location.locationId
                });
            }
        }

        return locationImageCoordinates;
    }
    
    function drawFooter(svgBase) {
        let footerText = globalConfig.footer.text;
    
        svgBase.append("rect")
            .attr("x", 0)
            .attr("y", h - globalConfig.footer.height)
            .attr("width", w)
            .attr("height", globalConfig.footer.height)
            .attr("fill", globalConfig.footer.background);
    
        let footerInfoElement = drawText(svgBase, {
            y: h - globalConfig.footer.height / 2,
            x: w/2
        }, footerText, { 
            color: globalConfig.footer.color,
            font:globalConfig.footer.font,
            fontSize: globalConfig.footer.fontSize,
            textAnchor: globalConfig.footer.textAnchor,
            textTransform: globalConfig.footer.textTransform,
            wrapNumber: w - globalConfig.infographic.paddingLeftRight * 2
        });
    }
    
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
        .attr("xlink:href", uri)
        .attr('x', coordinate.x)
        .attr('y', coordinate.y)
        .attr("width",  config.width)
        .attr("height", config.height)
        .attr("clip-path", config.imageClipPath);
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
            let lineText = line.join(" ");
            tspan.text(lineText + "..");
    
            if (tspan.node().getComputedTextLength() > width) {
              line.pop();
              lineText = line.join(" ");
    
              if (lineNumber == globalConfig.location.lineNumber) {
                // make sure infographic only have maximum 2 lines for each text
                tspan.text(lineText + "...");

                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    lineText = line.join(" ");
                    tspan.text(lineText + "...");
                    break;
                }

                break;
              }
    
              tspan.text(lineText);
              line = [word];
              tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
            else {
                tspan.text(lineText);
            }
          }
        });
      } 

    function loadImage(url, svgBase, coordinate, index){
        return new Promise(resolve => {
            var img = new Image();
            img.onload = function() {
                let ratio = this.width / this.height,
                    svgWidth = globalConfig.location.image.svgWidth,
                    svgHeight = globalConfig.location.image.svgHeight,
                    viewBoxWidth = globalConfig.location.image.viewBoxWidth,
                    viewBoxHeight = globalConfig.location.image.viewBoxHeight,
                    width = viewBoxWidth,
                    height = viewBoxHeight;

                if (ratio >= 1) {
                    width = height * ratio;
                }
                else {
                    height = width / ratio;
                }

                let svgImage = svgBase
                .append("g")
                .append("svg")
                .attr("x", coordinate.x)
                .attr("y", coordinate.y)
                .attr("width", svgWidth)
                .attr("height", svgHeight)
                .attr("viewBox", "0 0 " + viewBoxWidth + " " + viewBoxHeight);

                let clipPathId = "_id" + index;

                svgImage.append("defs")
                .append("clipPath")
                .attr("id", clipPathId)
                .append("path")
                .attr("x", 0)
                .attr("y", 0)
                .attr("d", globalConfig.location.image.clipPath); 

                drawImage(svgImage, {
                    y: 0,
                    x: 0 
                }, url, {
                    width: width,
                    height: height,
                    imageClipPath: "url(#" + clipPathId + ")"
                });

                svgBase.append("span").attr("name", "imgLoaded");
                resolve();
            };
            img.src = url;
        });
    }

    function calculateInfographicHeight(numberOfLocations) {
        return globalConfig.header.height + 
                globalConfig.content.paddingTop +
                globalConfig.content.itemHeight * numberOfLocations +
                globalConfig.content.paddingBottom + 
                globalConfig.footer.height;
    }

    function setGlobalConfig(numberOfLocations) {
        if (numberOfLocations == 3 || numberOfLocations == 4) {
            globalConfig = config_infographic_01.config_01_0304
        }
        else if (numberOfLocations == 5 || numberOfLocations == 6) {
            globalConfig = config_infographic_01.config_01_0506
        }
        else if (numberOfLocations >= 7) {
            globalConfig = config_infographic_01.config_01_others;
        }
    }

    function draw(trip) {
    
        let numberOfLocations = trip.locations.length;
        setGlobalConfig(numberOfLocations);

        w = globalConfig.infographic.width;
        h = calculateInfographicHeight(numberOfLocations);

        var svgBase = d3.select("#info-graphic-base")
        .attr("width", w)
        .attr("height", h); 

        drawBackground(svgBase, globalConfig.infographic.background);
        drawHeader(svgBase, trip);
        drawPathBetweenLocations(svgBase, numberOfLocations);

        let locationImageCoordinates = drawContent(svgBase, trip, numberOfLocations);
        let promises = [];

        let locationNoImage = trip.locations.find(item => item.signedUrl == "");

        if (locationNoImage) {
            //TODO: load default image if location has no image
            trip.locations = trip.locations.map(item => {
                return {
                    ...item,
                    signedUrl: item.signedUrl ? item.signedUrl : "./data/images/1.jpg"
                }
            });
        }

        trip.locations.forEach((location, index) => {
            var coordinate = locationImageCoordinates[index];
            promises.push(loadImage(location.signedUrl, svgBase, coordinate, index));
        });

        Promise.all(promises);
        drawFooter(svgBase);
    }

    return {
        draw: draw
    }
})();

