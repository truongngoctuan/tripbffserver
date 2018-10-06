    // ******************** Globals ************************
    var x = d3.scaleLinear().domain([-1, 1]).range([20, 500]);

    var steps = 5
    //Discrete diverging scale
    var color_threshold = d3.scaleThreshold()
        .domain(d3.range(-1 + 2 / steps, 1, 2 / steps)) //[-.6, -.2, .2, .6]
        .range(d3.schemePuOr[steps]); //=> 5 colors in an array

    //Continuous diverging scale
    var color_sequential = d3.scaleSequential(d3.interpolatePuOr)
        .domain([-1, 1]);


    function drawWithCanvas() {
        //Cleanup
        d3.select("#canvasExample").select("svg").remove();
        d3.select("#canvasExample").select("canvas").remove();
        // Background canvas for quick drawing of 2k lines
        var canvas = d3.select("#canvasExample").append("canvas")
            .attr("width", 960)
            .attr("height", 100);
        var ctx = canvas.node().getContext("2d");
        //Translucent svg on top to show the axis
        var svg = d3.select("#canvasExample").append("svg")
            .attr("width", 960)
            .attr("height", 100)
            .style("position", "absolute")
            .style("top", 0)
            .style("left", 0);

        // Let's add an axis
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0, 50)")
            .call(d3.axisTop(x));



        // Let's draw 20000 lines on canvas for speed
        d3.range(-1, 1, 0.0001)
            .forEach(function (d) {
                ctx.beginPath();
                ctx.strokeStyle = color_threshold(d);
                ctx.moveTo(x(d), 50);
                ctx.lineTo(x(d), 70);
                ctx.stroke();

                ctx.beginPath();
                ctx.strokeStyle = color_sequential(d);
                ctx.moveTo(x(d), 80);
                ctx.lineTo(x(d), 100);
                ctx.stroke();
            });
    } // drawWithCanvas


    function drawWithSVG() {
        // d3.select("#svgExample").select("svg").remove();
        var svgChart = d3.select("#svgChart")
            .attr("width", 960)
            .attr("height", 100);

        //TODO: clear ?

        // Let's add an axis
        svgChart.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0, 50)")
            .call(d3.axisTop(x));


        var line = d3.line();

        var gStep = svgChart.append("g");
        var gSeq = svgChart.append("g");

        // Let's draw 20000 lines with svg
        gStep.selectAll("path")
            .data(d3.range(-1, 1, 0.0001))
            .enter()
            .append("path")
            .attr("d", function (d) {
                return line([
                    [x(d), 50],
                    [x(d), 70]
                ]);
            })
            .style("stroke", color_threshold);

        gSeq.selectAll("path")
            .data(d3.range(-1, 1, 0.0001))
            .enter()
            .append("path")
            .attr("d", function (d) {
                return line([
                    [x(d), 80],
                    [x(d), 100]
                ]);
            })
            .style("stroke", color_sequential);

    } // drawWithSVG

    drawWithSVG();