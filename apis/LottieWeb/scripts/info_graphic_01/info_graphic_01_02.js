//follow this demo
//      https://blog.adioma.com/how-to-create-timeline-infographic/

// draw basic shape
// https://www.dashingd3js.com/svg-basic-shapes-and-d3js

var draw_01_02 = (function() {
    
    var globalConfig = config_infographic_01.config_01_02;
    
    let w = globalConfig.infographic.width;
    let h = globalConfig.infographic.height;

    function drawHeader(svgBase, trip) {
        svgBase.append("rect")
            .attr("width", w)
            .attr("height", globalConfig.header.height)
            .attr("fill", globalConfig.header.background);
    
        let tripNameNode = drawText(svgBase, {
            y: 50,
            x: w / 2
        }, trip.name, { 
            color: globalConfig.header.tripName.color,
            font: globalConfig.header.tripName.font,
            fontSize: globalConfig.header.tripName.fontSize,
            textAnchor: globalConfig.header.tripName.textAnchor,
            fontWeight: globalConfig.header.tripName.fontWeight,
            textTransform: globalConfig.header.tripName.textTransform,
            wrapNumber: w - globalConfig.infographic.paddingLeftRight * 2 
        });
        let tripNameNodeBbox = tripNameNode.node().getBBox();
        let numberOfDays = trip.numberOfDays,
            numberOfLocations = trip.locations.length,
            dayLabel = commonFunc.getDayLabel(trip.locale, numberOfDays),
            locationLabel = commonFunc.getLocationLabel(trip.locale, numberOfLocations); 

        let dayText =  " " + dayLabel + ", ",
            locationText = " " + locationLabel,
            basicTripInfo = numberOfDays + dayText + numberOfLocations + locationText;
    
        drawText(svgBase, {
            y: tripNameNodeBbox.y + tripNameNodeBbox.height + 40,
            x: w / 2
        }, basicTripInfo, { 
            color: globalConfig.header.tripDescription.color,
            font: globalConfig.header.tripDescription.font,
            fontSize: globalConfig.header.tripDescription.fontSize,
            textAnchor: globalConfig.header.tripDescription.textAnchor,
            wrapNumber: w - globalConfig.infographic.paddingLeftRight * 2  
        });
    }
    
    function drawContent(svgBase, location, startPointCoordinate, locale) {
        let startPoint_px = startPointCoordinate.x,
            startPoint_py = startPointCoordinate.y;   
    
        let feelingLabel = commonFunc.getFeelingLabel(locale);

        let locationName = capitalizeFirstLetter(location.name) + ".",
            feeling = location.feeling ? feelingLabel + ' ' + location.feeling : "",
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
    
        let locationName_px = startPoint_px,
        locationName_py = startPoint_py;
    
        let locationNameNode = drawText(svgBase, {
                y: locationName_py,
                x: locationName_px
            }, locationName, { 
                color: globalConfig.location.name.color,
                font: globalConfig.location.name.font,
                fontSize: globalConfig.location.name.fontSize,
                fontWeight: globalConfig.location.name.fontWeight,
                textAnchor: globalConfig.location.name.textAnchor,
                textTransform: globalConfig.location.name.textTransform,
                wrapNumber: w / 2 - globalConfig.imageContainer.paddingBetweenImage * 4
            });
        let locationNameNodeBbox = locationNameNode.node().getBBox();
        let nextElementYCoordinate = locationNameNodeBbox.y + locationNameNodeBbox.height;

        if (nodeFeelingActivity) {
            let feelingActivityNode = drawText(svgBase, {
                y: nextElementYCoordinate + globalConfig.location.paddingTop,
                x: locationName_px
            }, nodeFeelingActivity, { 
                color: globalConfig.location.description.color,
                font: globalConfig.location.description.font,
                fontSize: globalConfig.location.description.fontSize,
                textAnchor: globalConfig.location.description.textAnchor,
                wrapNumber: w / 2 - globalConfig.imageContainer.paddingBetweenImage * 4
            });
            let feelingActivityNodeBbox = feelingActivityNode.node().getBBox();
            nextElementYCoordinate = feelingActivityNodeBbox.y + feelingActivityNodeBbox.height;
        }
        
        if (highlights) {
            let hightlightNode = drawText(svgBase, {
                y: nextElementYCoordinate + globalConfig.location.paddingTop,
                x: locationName_px
            }, highlights, { 
                color: globalConfig.location.description.color,
                font: globalConfig.location.description.font,
                fontSize: globalConfig.location.description.fontSize,
                textAnchor: globalConfig.location.description.textAnchor,
                wrapNumber: w / 2 - globalConfig.imageContainer.paddingBetweenImage * 4
            });
            let highlightNodeBbox = hightlightNode.node().getBBox();
            nextElementYCoordinate = highlightNodeBbox.y + highlightNodeBbox.height;
        }
        
        return nextElementYCoordinate;
    }    
    
    function drawImage(svgImage, coordinate, uri, config) {
        var svgCanvas = svgImage.append("svg:image");
        svgCanvas
        .attr('x', coordinate.x)
        .attr('y', coordinate.y)
        .attr('width', config.width)
        .attr('height', config.height)
        .attr("xlink:href", uri)
        .attr("clip-path", config.imageClipPath)
    }
    
    function drawFooter(svgBase) {         
        drawImage(svgBase, {
            x: w - globalConfig.footer.marginRight,
            y: h - globalConfig.footer.marginBottom
        }, "data/images/App_Signature.png", {
            width: globalConfig.footer.imageWidth,
            height: globalConfig.footer.imageHeight
        });        
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
    
              if (lineNumber == globalConfig.location.lineNumber) {
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
   
    function drawBackground(svgBase, backgroundColor) {
        svgBase.style('background-color', backgroundColor);
    }
    
    function loadImage(url, svgBase, coordinate, index){
        return new Promise(resolve => {
            var img = new Image();
            img.onload = function() {
                let ratio = this.width / this.height,
                    svgWidth = globalConfig.imageContainer.svgWidth,
                    svgHeight = globalConfig.imageContainer.svgHeight,
                    viewBoxWidth = globalConfig.imageContainer.viewBoxWidth,
                    viewBoxHeight = globalConfig.imageContainer.viewBoxHeight,
                    width = viewBoxWidth,
                    height = viewBoxHeight;

                if (ratio >= 1) {
                    width = height * ratio;
                }
                else {
                    height = width / ratio;
                }

                var svgImage = svgBase.append("svg")
                .attr("y", coordinate.y)
                .attr("x", coordinate.x)
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
                .attr("d", globalConfig.imageContainer.clipPath); 

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

    function draw(trip) { 

        var svgBase = d3.select("#info-graphic-base")    
        .attr("width", w)
        .attr("height", h);

        drawBackground(svgBase, globalConfig.infographic.background);    
        drawHeader(svgBase, trip);  

        let locationNoImage = trip.locations.find(item => item.signedUrl == "");

        if (locationNoImage) {
            // load default image if location has no image
            trip.locations = trip.locations.map(item => {
                return {
                    ...item,
                    signedUrl: item.signedUrl ? item.signedUrl : "./data/images/EmptyImage02.jpg"
                }
            });
        }

        let promise01 = loadImage(trip.locations[0].signedUrl, svgBase, {
            x: globalConfig.infographic.paddingLeftRight,
            y: 170 + globalConfig.imageContainer.paddingTop
        }, 0);

        let promise02 = loadImage(trip.locations[1].signedUrl, svgBase, {
            x: w / 2 + globalConfig.imageContainer.paddingBetweenImage,
            y: 170 + globalConfig.imageContainer.paddingTop
        }, 1);

        Promise.all([promise01, promise02]); 

        let firstLatestHeight = drawContent(svgBase, trip.locations[0], {
            x: globalConfig.infographic.paddingLeftRight,
            y: 1100
        }, trip.locale);
    
        let secondLatestHeight = drawContent(svgBase, trip.locations[1], {
            x: w / 2 + globalConfig.imageContainer.paddingBetweenImage * 4,
            y: 1100
        }, trip.locale);
    
        h = firstLatestHeight >= secondLatestHeight
                    ? firstLatestHeight + globalConfig.infographic.paddingBottom + globalConfig.footer.height 
                    : secondLatestHeight + globalConfig.infographic.paddingBottom + globalConfig.footer.height;
        svgBase.attr("height", h);
    
        drawFooter(svgBase);  
    }

    return {
        draw: draw
    }
})();
