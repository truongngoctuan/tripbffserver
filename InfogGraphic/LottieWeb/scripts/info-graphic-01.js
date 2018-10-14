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
            }
            else if (iRow % 2 == 0 && iItemInRow == 0) {
                console.log("hey")
                //draw a curve between rows
                context.bezierCurveTo(x1 - w * 2 / 3, y1, x2 - w * 2 / 3, y2, x2, y2);
            }
            else {
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
        .attr("fill", "none")
        ;

}

function drawPathBetweenLocationsBetweenRows(svgBase, nItems, nItemsPerRow) {

    const w = 200,
        h = 200;
    const c_paddingLeft = 50,
        c_paddingRight = 50,
        c_paddingTop = 100,
        c_paddingBottom = 100;
    const nRow = nItems / nItemsPerRow;

    var x1, y1, x2, y2;
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

            //Draw the line
            var line = svgBase.append("line")
                .attr("x1", x1)
                .attr("y1", y1)
                .attr("x2", x2)
                .attr("y2", y2)
                .attr("stroke-width", 4)
                .attr("stroke", "black");

        }

        x1 = px;
        y1 = py;
    }


}

const N_ITEMS = 12;
const N_ITEMS_PER_ROW = 4;

var svgBase = d3.select("#info-graphic-base");
// .attr("width", 1000)
// .attr("height", 2000);
drawPathBetweenLocationsInTheSameRow(svgBase, N_ITEMS, N_ITEMS_PER_ROW);
// drawPathBetweenLocationsBetweenRows(svgBase, N_ITEMS, N_ITEMS_PER_ROW);
drawLocations(svgBase, N_ITEMS, N_ITEMS_PER_ROW);