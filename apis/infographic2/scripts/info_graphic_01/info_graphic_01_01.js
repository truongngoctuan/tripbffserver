const utils = require("../utils");
const globalInfographic01Config = require("../../configs/info_graphic_01/config");
const commonFunc = require("../commonFunc");
var globalConfig = globalInfographic01Config.config_01_01;

var w = globalConfig.infographic.width,
  h = globalConfig.infographic.height,
  content_height = globalConfig.infographic.content_height,
  footer_height = globalConfig.infographic.footer_height,
  paddingLeftRight = globalConfig.infographic.paddingLeftRight,
  c_paddingTop = globalConfig.infographic.c_paddingTop;

async function drawContent(canvasAdaptor, trip) {
  let startPoint_px = paddingLeftRight,
    startPoint_py = h - content_height - footer_height + c_paddingTop;

  let feelingLabel = commonFunc.getFeelingLabel(trip.locale);

  let location = trip.locations[0],
    locationName = capitalizeFirstLetter(location.name) + ".",
    feeling = location.feeling ? feelingLabel + " " + location.feeling : "",
    activity = location.activity,
    highlights = location.highlights.toLowerCase(),
    nodeFeelingActivity = "";

  if (activity)
    nodeFeelingActivity = capitalizeFirstLetter(activity.toLowerCase());
  if (feeling) {
    feeling = capitalizeFirstLetter(feeling.toLowerCase());
    nodeFeelingActivity = nodeFeelingActivity
      ? nodeFeelingActivity + ". " + feeling
      : feeling;
  }
  if (nodeFeelingActivity) nodeFeelingActivity += ".";

  if (highlights) highlights = capitalizeFirstLetter(highlights) + ".";

  let locationName_px = startPoint_px,
    locationName_py = startPoint_py;

    console.log("locationName", locationName);
  let locationNameNode = canvasAdaptor.drawText(
    locationName + locationName + locationName,
    {
      y: locationName_py,
      x: locationName_px
    },
    {
      color: globalConfig.location.name.color,
      font: globalConfig.location.name.fontFamily,
      fontSize: globalConfig.location.name.fontSize,
      fontWeight: globalConfig.location.name.fontWeight,
      textAnchor: globalConfig.location.name.textAnchor,
      textTransform: globalConfig.location.name.textTransform,
      wrapNumber: w - paddingLeftRight
    }
  );
  canvasAdaptor.drawText(
    locationName + locationName + locationName,
    {
      y: locationName_py + 60,
      x: locationName_px
    },
    {
      color: globalConfig.location.name.color,
      font: "Arial",
      fontSize: globalConfig.location.name.fontSize,
      fontWeight: globalConfig.location.name.fontWeight,
      textAnchor: globalConfig.location.name.textAnchor,
      textTransform: globalConfig.location.name.textTransform,
      wrapNumber: w - paddingLeftRight
    }
  );
  // let locationNameNodeBbox = locationNameNode.node().getBBox();
  // var nextElementYCoordinate =
  //   locationNameNodeBbox.y +
  //   locationNameNodeBbox.height +
  //   globalConfig.location.paddingTop;

  // if (nodeFeelingActivity) {
  //   console.log("nodeFeelingActivity", nodeFeelingActivity)
  //   let feelingActivityNode = drawText(
  //     canvasAdaptor,
  //     {
  //       y: nextElementYCoordinate,
  //       x: locationName_px
  //     },
  //     nodeFeelingActivity,
  //     {
  //       color: globalConfig.location.description.color,
  //       font: globalConfig.location.description.fontFamily,
  //       fontSize: globalConfig.location.description.fontSize,
  //       textAnchor: globalConfig.location.description.textAnchor,
  //       wrapNumber: w - paddingLeftRight
  //     }
  //   );
  //   let feelingActivityNodeBbox = feelingActivityNode.node().getBBox();
  //   nextElementYCoordinate =
  //     feelingActivityNodeBbox.y +
  //     feelingActivityNodeBbox.height +
  //     globalConfig.location.paddingTop;
  // }

  // if (highlights) {
  //   let hightlightNode = drawText(
  //     canvasAdaptor,
  //     {
  //       y: nextElementYCoordinate,
  //       x: locationName_px
  //     },
  //     highlights,
  //     {
  //       color: globalConfig.location.description.color,
  //       font: globalConfig.location.description.fontFamily,
  //       fontSize: globalConfig.location.description.fontSize,
  //       textAnchor: globalConfig.location.description.textAnchor,
  //       wrapNumber: w - paddingLeftRight
  //     }
  //   );
  //   let hightlightNodeBbox = hightlightNode.node().getBBox();
  //   nextElementYCoordinate =
  //     hightlightNodeBbox.y +
  //     hightlightNodeBbox.height +
  //     globalConfig.location.paddingTop;
  // }

  await canvasAdaptor.drawImage(
    "./data/images/App_Signature.png",
    {
      x: w - globalConfig.footer.marginRight,
      y: h - globalConfig.footer.marginBottom
    }
    
    // {
    //   width: globalConfig.footer.imageWidth,
    //   height: globalConfig.footer.imageHeight
    // }
  );
}

function drawImage(svgBase, coordinate, uri, config) {
  var svgImage = svgBase
    .append("svg:image")
    .attr("x", coordinate.x)
    .attr("y", coordinate.y)
    .attr("width", config.width)
    .attr("xlink:href", uri);

  if (config.height) {
    svgImage.attr("height", config.height);
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function drawText(svgBase, coordinate, text, config) {
  var svgCanvas = svgBase.append("text");
  svgCanvas
    .attr("y", coordinate.y)
    .attr("x", coordinate.x)
    .style("text-anchor", config.textAnchor)
    .style("text-transform", config.textTransform)
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
      words = text
        .text()
        .split(/\s+/)
        .reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.1, // ems
      y = text.attr("y"),
      x = text.attr("x"),
      dy = 0.35,
      tspan = text
        .text(null)
        .append("tspan")
        .attr("x", x)
        .attr("y", y)
        .attr("dy", dy + "em");

    while ((word = words.pop())) {
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
        tspan = text
          .append("tspan")
          .attr("x", x)
          .attr("y", y)
          .attr("dy", ++lineNumber * lineHeight + dy + "em")
          .text(word);
      }
    }
  });
}

function drawBackground(svgBase, backgroundColor) {
  svgBase.style("background-color", backgroundColor);
}

async function draw(canvasAdaptor, trip) {
  // var viewBox = "0 0" + " " + w + " " + h;
  // var svgBase = d3
  //   .select("#info-graphic-base")
  //   .attr("width", w)
  //   .attr("height", h)
  //   .attr("viewBox", viewBox)
  //   .attr("preserveAspectRatio", "xMinYMin meet");

  // load default image if location has no image
  var imgUri = trip.locations[0].signedUrl
    ? trip.locations[0].signedUrl
    : "./data/images/EmptyImage01.jpg";

  await canvasAdaptor.drawImage(
    imgUri,
    { x: 0, y: 0 },
    ({ width, height }) => {
      var ratio = width / height;
      var h = w / ratio;

      h += content_height + footer_height;
      console.log("w", w);
      console.log("h", h);
      canvasAdaptor.resize(w, h);
    }
  );

  canvasAdaptor.drawBackground(globalConfig.infographic.background);

  await drawContent(canvasAdaptor, trip);
}

module.exports = {
  draw
};
