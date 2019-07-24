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
    
        let numberOfLocations = trip.locations.length,
            dayText = trip.numberOfDays > 1 ? " days, " : " day, ",
            locationText = numberOfLocations > 1 ? " locations" : " location",
            basicTripInfo = trip.numberOfDays + dayText + numberOfLocations + locationText;
    
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
    
    function drawContent(svgBase, location, startPointCoordinate) {
        let startPoint_px = startPointCoordinate.x,
            startPoint_py = startPointCoordinate.y;   
    
        let locationName = capitalizeFirstLetter(location.name) + ".",
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
                wrapNumber: w / 2 - globalConfig.imageContainer.paddingBetweenImage
            });
        let locationNameNodeBbox = locationNameNode.node().getBBox();
    
        let feelingActivityNode = drawText(svgBase, {
            y: locationNameNodeBbox.y + locationNameNodeBbox.height + globalConfig.location.paddingTop,
            x: locationName_px
        }, nodeFeelingActivity, { 
            color: globalConfig.location.description.color,
            font: globalConfig.location.description.font,
            fontSize: globalConfig.location.description.fontSize,
            textAnchor: globalConfig.location.description.textAnchor,
            wrapNumber: w / 2 - globalConfig.imageContainer.paddingBetweenImage
        });
        let feelingActivityNodeBbox = feelingActivityNode.node().getBBox();
        let hightlightNode = drawText(svgBase, {
            y: feelingActivityNodeBbox.y + feelingActivityNodeBbox.height + globalConfig.location.paddingTop,
            x: locationName_px
        }, highlights, { 
            color: globalConfig.location.description.color,
            font: globalConfig.location.description.font,
            fontSize: globalConfig.location.description.fontSize,
            textAnchor: globalConfig.location.description.textAnchor,
            wrapNumber: w / 2 - globalConfig.imageContainer.paddingBetweenImage 
        });
        return hightlightNode;
    }
    
    function drawImageContainer(svgBase, coordinate, uri) {
        var svgImage = svgBase.append("svg")
        .attr("y", coordinate.y)
        .attr("x", coordinate.x)
        .attr("width", w / 2 - globalConfig.imageContainer.paddingBetweenImage)
        .attr("height", globalConfig.imageContainer.heightContainer)
        .attr("viewBox", globalConfig.imageContainer.viewBox);  
    
        drawImage(svgImage, {
            y: 0,
            x: -108 
        }, uri, {
            width: globalConfig.imageContainer.width,
            height: globalConfig.imageContainer.height
        });
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
        let footerText = globalConfig.footer.text;
    
        svgBase.append("rect")
            .attr("x", 0)
            .attr("y", h - globalConfig.footer.height)
            .attr("width", w)
            .attr("height", globalConfig.footer.height)
            .attr("fill", globalConfig.footer.background);
    
        let footerInfoElement = drawText(svgBase, {
            y: h - globalConfig.footer.height / 2,
            x: w / 2
        }, footerText, { 
            color: globalConfig.footer.color,
            font: globalConfig.footer.font,
            fontSize: globalConfig.footer.fontSize,
            textAnchor: globalConfig.footer.textAnchor,
            textTransform: globalConfig.footer.textTransform,
            wrapNumber: w - globalConfig.infographic.paddingLeftRight * 2
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
    
    function loadImage(url, svgImage){
        return new Promise(resolve => {
            var img = new Image();
            img.onload = function() {
                svgImage.append("span").attr("name", "imgLoaded");
                resolve();
            };
            img.src = url;
        });
    }    

    function draw(trip) { 

        var svgBase = d3.select("#info-graphic-base")    
        .attr("width", w)
        .attr("height", h);

        Promise.all(trip.locations.map(item => loadImage(item.signedUrl, svgBase)));
     
        drawBackground(svgBase, globalConfig.infographic.background);    
        drawHeader(svgBase, trip);
    
        drawImageContainer(svgBase, {
            x: 0,
            y: 170 + globalConfig.imageContainer.paddingTop
        }, trip.locations[0].signedUrl);
    
        drawImageContainer(svgBase, {
            x: w / 2 + globalConfig.imageContainer.paddingBetweenImage,
            y: 170 + globalConfig.imageContainer.paddingTop
        }, trip.locations[1].signedUrl);
    
        let lastElementOfFirstLocationNode = drawContent(svgBase, trip.locations[0], {
            x: globalConfig.infographic.paddingLeftRight,
            y: 1100
        });
    
        let lastElementOfSecondLocationNode = drawContent(svgBase, trip.locations[1], {
            x: w / 2 + globalConfig.imageContainer.paddingBetweenImage,
            y: 1100
        });
    
        let firstBbox = lastElementOfFirstLocationNode.node().getBBox(),
            secondBbox = lastElementOfSecondLocationNode.node().getBBox(),
            firstLatestHeight = firstBbox.y + firstBbox.height,
            secondLatestHeight = secondBbox.y + secondBbox.height;
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
