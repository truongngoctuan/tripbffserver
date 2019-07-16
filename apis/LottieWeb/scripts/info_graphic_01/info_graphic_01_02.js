//follow this demo
//      https://blog.adioma.com/how-to-create-timeline-infographic/

// draw basic shape
// https://www.dashingd3js.com/svg-basic-shapes-and-d3js

var draw_01_02 = (function() {
    
    function drawHeader(svgBase, trip) {
        svgBase.append("rect")
            .attr("width", w)
            .attr("height", header_height)
            .attr("fill", "rgb(254, 255, 246)");
    
        let tripNameNode = drawText(svgBase, {
            y: 50,
            x: w/2
        }, trip.name, { 
            color: "rgb(0, 0, 0)",
            font: "Sans Serif",
            fontSize: "64px",
            textAnchor: "middle",
            fontWeight: "bold",
            textTransform: "uppercase",
            wrapNumber: w - paddingLeftRight * 2 
        });
        let tripNameNodeBbox = tripNameNode.node().getBBox();
    
        let numberOfLocations = trip.locations.length,
            dayText = trip.numberOfDays > 1 ? " days, " : " day, ",
            locationText = numberOfLocations > 1 ? " locations" : " location",
            basicTripInfo = trip.numberOfDays + dayText + numberOfLocations + locationText;
    
        drawText(svgBase, {
            y: tripNameNodeBbox.y + tripNameNodeBbox.height + 40,
            x: w/2
        }, basicTripInfo, { 
            color: "rgb(0, 0, 0)",
            font: "Sans Serif",
            fontSize: "52px",
            textAnchor: "middle",
            wrapNumber: w - paddingLeftRight * 2 
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
                color: globalConfig.location.nameColor,
                font: globalConfig.location.nameFontFamily,
                fontSize: globalConfig.location.nameFontSize,
                fontWeight: "bold",
                textAnchor: "start",
                textTransform: "uppercase",
                wrapNumber: w / 2 - paddingBetweenImage
            });
        let locationNameNodeBbox = locationNameNode.node().getBBox();
    
        let feelingActivityNode = drawText(svgBase, {
            y: locationNameNodeBbox.y + locationNameNodeBbox.height + globalConfig.location.paddingTop,
            x: locationName_px
        }, nodeFeelingActivity, { 
            color: globalConfig.location.descriptionColor,
            font: globalConfig.location.descriptionFontFamily,
            fontSize: globalConfig.location.descriptionFontSize,
            textAnchor: "start",
            wrapNumber: w / 2 - paddingBetweenImage
        });
        let feelingActivityNodeBbox = feelingActivityNode.node().getBBox();
        let hightlightNode = drawText(svgBase, {
            y: feelingActivityNodeBbox.y + feelingActivityNodeBbox.height + globalConfig.location.paddingTop,
            x: locationName_px
        }, highlights, { 
            color: globalConfig.location.descriptionColor,
            font: globalConfig.location.descriptionFontFamily,
            fontSize: globalConfig.location.descriptionFontSize,
            textAnchor: "start",
            wrapNumber: w / 2 - paddingBetweenImage 
        });
        return hightlightNode;
    }
    
    function drawImageContainer(svgBase, coordinate, uri) {
        var svgImage = svgBase.append("svg")
        .attr("y", coordinate.y)
        .attr("x", coordinate.x)
        .attr("width", w / 2 - paddingBetweenImage)
        .attr("height", 840)
        .attr("viewBox", "0 0 280 373.3");  
    
        drawImage(svgImage, {
            y: 0,
            x: -108 
        }, uri, {
            width: "505",
            height: "379"
        });
    }
    
    function drawImage(svgBase, coordinate, uri, config) {
        var svgCanvas = svgBase.append("svg:image");
        svgCanvas
        .attr('x', coordinate.x)
        .attr('y', coordinate.y)
        .attr('width', config.width)
        .attr('height', config.height)
        .attr("xlink:href", uri)
        .attr("clip-path", config.imageClipPath)
    }
    
    function drawFooter(svgBase) {
        let footerText = "MORE INFO: WWW.TRIPBFF.COM";
    
        svgBase.append("rect")
            .attr("x", 0)
            .attr("y", h - footer_height)
            .attr("width", w)
            .attr("height", footer_height)
            .attr("fill", "rgb(254, 255, 246)");
    
        let footerInfoElement = drawText(svgBase, {
            y: h - footer_height / 2,
            x: w/2
        }, footerText, { 
            color: "#121113",
            font: "San Serif",
            fontSize: "28px",
            textAnchor: "middle",
            textTransform: "uppercase",
            wrapNumber: w - paddingLeftRight * 2
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
    
    
    var N_ITEMS = 1;
    
    var header_height = 170;
    var content_height = 300;
    var footer_height = 70;
    var paddingBetweenImage = 5;
    var paddingLeftRight = 20;
    var c_paddingTop = 20,
          c_paddingBottom = 10;
    
    var w = 1280;
    var h = 1500;
    
    var globalConfig = {
        location: {
            nameFontSize: "64px",
            nameFontFamily: "Sans Serif",
            nameColor: "#121113",
            descriptionFontSize: "48px",
            descriptionFontFamily: "Times Neue Roman",
            descriptionColor: "#121113",
            paddingTop: 30,
            lineNumber: 1
        }  
    };
     
    function drawBackground(svgBase, backgroundColor) {
        svgBase.style('background-color', backgroundColor);
    }
    
    function draw(trip) {
    
        N_ITEMS = trip.locations.length;
    
        var svgBase = d3.select("#info-graphic-base")    
            .attr("width", w)
            .attr("height", h);
            
        drawBackground(svgBase, "rgb(254, 255, 246)");    
        drawHeader(svgBase, trip);
    
        drawImageContainer(svgBase, {
            x: 0,
            y: 170 + c_paddingTop
        }, "./data/images/2.jpg");
    
        drawImageContainer(svgBase, {
            x: w / 2 + paddingBetweenImage,
            y: 170 + c_paddingTop
        }, "./data/images/3.jpg");
       
        let lastElementOfFirstLocationNode = drawContent(svgBase, trip.locations[0], {
            x: paddingLeftRight,
            y: 1100
        });
    
        let lastElementOfSecondLocationNode = drawContent(svgBase, trip.locations[1], {
            x: w / 2 + paddingBetweenImage,
            y: 1100
        });
    
        let firstBbox = lastElementOfFirstLocationNode.node().getBBox(),
            secondBbox = lastElementOfSecondLocationNode.node().getBBox(),
            firstLatestHeight = firstBbox.y + firstBbox.height,
            secondLatestHeight = secondBbox.y + secondBbox.height;
        h = firstLatestHeight >= secondLatestHeight
                     ? firstLatestHeight + c_paddingBottom + footer_height 
                     : secondLatestHeight + c_paddingBottom + footer_height;
        svgBase.attr("height", h);
    
        drawFooter(svgBase);
    }

    return {
        draw: draw
    }
})();
