var temp, temp1;
function renderTimeLine() {
    var group, barGroup;

    var m = [80, 160, 0, 80]; // top right bottom left
    var w = 800 - m[1] - m[3]; // width    
    var h = 600 - m[0] - m[2]; // height
    var min = 126;

    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];				//Array to display the current month on the TodayLine

    //Data array for the timeline
    var data = [{ "label": "chlorthalidone", "dates": [{ "startdate": new Date(2013, 8, 19), "enddate": new Date(2020, 8, 19), "strength": 16, "dosage": 25, "dosage2": "", "dosage3": " mg" }] },
    { "label": "Lipitor", "dates": [{ "startdate": new Date(2015, 5, 25), "enddate": new Date(2016, 6, 02), "strength": 1, "dosage": 20, "dosage2": "", "dosage3": " mg" }, { "startdate": new Date(2016, 6, 02), "enddate": new Date(2017, 2, 08), "strength": 16, "dosage": 40, "dosage2": "", "dosage3": " mg" }] },
    { "label": "Norco", "dates": [{ "startdate": new Date(2017, 6, 14), "enddate": new Date(2020, 7, 14), "strength": 8, "dosage": 325, "dosage2": "", "dosage3": " mg" }] },
    { "label": "metoprolol", "dates": [{ "startdate": new Date(2018, 0, 19), "enddate": new Date(2020, 6, 01), "strength": 1, "dosage": 50, "dosage2": "", "dosage3": " mg" }] },
    { "label": "clonazepam", "dates": [{ "startdate": new Date(2018, 1, 04), "enddate": new Date(2020, 4, 3), "strength": 8, "dosage": 1, "dosage2": " bid", "dosage3": " mg" }] },
    { "label": "trazodone", "dates": [{ "startdate": new Date(2018, 1, 18), "enddate": new Date(2018, 4, 09), "strength": 1, "dosage": 50, "dosage2": "", "dosage3": " mg" }, { "startdate": new Date(2018, 4, 09), "enddate": new Date(2018, 7, 12), "strength": 4, "dosage": 100, "dosage2": "", "dosage3": " mg" }, { "startdate": new Date(2018, 7, 12), "enddate": new Date(2018, 10, 28), "strength": 8, "dosage": 150, "dosage2": "", "dosage3": " mg" }, { "startdate": new Date(2018, 10, 28), "enddate": new Date(2019, 2, 12), "strength": 4, "dosage": 100, "dosage2": "", "dosage3": " mg" }] },
    { "label": "warfarin", "dates": [{ "startdate": new Date(2018, 4, 09), "enddate": new Date(2018, 10, 11), "strength": 8, "dosage": 7.5, "dosage2": "", "dosage3": " mg" }] },
    { "label": "lisonopril", "dates": [{ "startdate": new Date(2018, 8, 26), "enddate": new Date(2018, 11, 12), "strength": 4, "dosage": 10, "dosage2": "", "dosage3": " mg" }, { "startdate": new Date(2018, 11, 12), "enddate": new Date(2019, 2, 05), "strength": 8, "dosage": 20, "dosage2": "", "dosage3": " mg" }] },
    { "label": "Nexium", "dates": [{ "startdate": new Date(2018, 9, 24), "enddate": new Date(2019, 4, 19), "strength": 16, "dosage": 40, "dosage2": "", "dosage3": " mg" }] },
    { "label": "Cymbalta", "dates": [{ "startdate": new Date(2019, 2, 24), "enddate": new Date(2019, 3, 06), "strength": 16, "dosage": 60, "dosage2": "", "dosage3": " mg" }] },
    { "label": "bupropion", "dates": [{ "startdate": new Date(2019, 3, 19), "enddate": new Date(2019, 4, 14), "strength": 1, "dosage": 150, "dosage2": "", "dosage3": " mg" }, { "startdate": new Date(2019, 4, 14), "enddate": new Date(2019, 8, 10), "strength": 16, "dosage": 150, "dosage2": " bid", "dosage3": " mg" }] },
    { "label": "nitroglycerin", "dates": [{ "startdate": new Date(2019, 6, 04), "enddate": new Date(2020, 6, 04), "strength": 8, "dosage": 0.4, "dosage2": "", "dosage3": " mg" }] },
    { "label": "pravastatin", "dates": [{ "startdate": new Date(2019, 6, 04), "enddate": new Date(2020, 6, 04), "strength": 8, "dosage": 40, "dosage2": "", "dosage3": " mg" }] },
    { "label": "varenicline", "dates": [{ "startdate": new Date(2020, 1, 22), "enddate": new Date(2020, 1, 25), "strength": 1, "dosage": 0.5, "dosage2": "", "dosage3": " mg" }, { "startdate": new Date(2020, 1, 28), "enddate": new Date(2020, 4, 22), "strength": 16, "dosage": 1, "dosage2": "", "dosage3": " mg" }] },
    { "label": "terbinafine", "dates": [{ "startdate": new Date(2020, 4, 30), "enddate": new Date(2020, 6, 30), "strength": 16, "dosage": 250, "dosage2": "", "dosage3": " mg" }] }
    ];

    var x = d3.time.scale().range([min, w + m[1]]);		//X-axis 
    var x2 = d3.time.scale().range([min, w + m[1]]);		//X-axis in the scrubber region

    var startdates = [];									//Array to store the startdates
    var enddates = [];									//Array to store the enddates

    //This loop adds the startdates and enddates into the respective arrays
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].dates.length; j++) {
            startdates[startdates.length] = new Date(data[i].dates[j].startdate);
            enddates[enddates.length] = new Date(data[i].dates[j].enddate);
        }
    }

    var minDate = startdates[0]; //Variable to store the minimum Date
    var maxDate = enddates[0]; //Variable to store the maximum Date

    //Loop to find out the min and max Date
    for (var i = 1; i < startdates.length; i++) {
        if (startdates[i] < minDate)
            minDate = startdates[i];

        if (enddates[i] > maxDate)
            maxDate = enddates[i];
    }

    minDate = new Date(minDate.getFullYear(), 0, 1);
    maxDate = new Date(maxDate.getFullYear() + 1, 0, 1);

    var today = new Date();
    var lDate = new Date(); //Variable to store the left date to set brush extent
    var rDate = new Date();	//Variable to store the right date to set brush extent 

    today.setTime(Date.now()); //Stores the current Date
    rDate.setTime(today.getTime() + (1000 * 60 * 60 * 24 * 365 * 1)); //1 year after today
    lDate.setTime(today.getTime() - (1000 * 60 * 60 * 24 * 365 * 1)); //1 year before today

    //Setting the domain of the x-axis
    x.domain([minDate, maxDate]);
    x2.domain([minDate, maxDate]);

    //Setting the Y-axis
    var y = d3.scale.linear().domain([0, 19]).range([75, h - 40]);

    //Declaring the zoom behavior
    zoom = d3.behavior.zoom()
        .scaleExtent([.7, 1.3])
        .on("zoom", zoomed);

    //Declaring the brush
    brush = d3.svg.brush()
        .x(x2)
        .extent([lDate, rDate])
        .on("brush", brushed);

    //Creating the chart area
    var chart = d3.select('#nix-timeline').append("svg")
        .classed("chart", true)
        .attr("width", w + m[1] + 50)
        .attr("height", h + m[0] + m[2]);

    //Setting the x-axis
    var xaxis = d3.svg.axis()
        .scale(x)
        .orient("top")
        .tickSize(h - 80)
        .tickPadding(13);

    //Append the x-axis to the chart
    chart.append("g").attr("class", "x axis")
        .attr("transform", "translate(-20, " + (h - 25) + ")")
        .attr("font-size", "15px")
        .call(xaxis);

    //Variable to create the timeline bars
    var medicines = chart.selectAll(".medicineGroup").data(data).enter().append('g').classed("medicineGroup", true)
        .attr('transform', function (d, i) { return 'translate(-20,' + (y(i)) + ')' });

    //Selects each medicine group and draws the reactangle for each drug
    //based on the start date and end date in the data array and displays the
    //dosage of each drug for a given period of time
    medicines.each(function (d, i) {
        group = d3.select(this);

        barGroup = group.append("g").classed("barGroup", true); //Appends timeline bars and text to the bars
        barGroup.selectAll(".timeBars")
            .data(d.dates)
            .enter()
            .append("rect")
            .classed("timeBars", true)
            .attr("y", -10)
            .attr("height", 20)
            .attr("fill", function (d) {
                if (d.strength == 1) {
                    return "rgba(0,0,195,1)";
                } else if (d.strength == 4) {
                    return "rgba(195,195,0,1)";
                } else if (d.strength == 8) {
                    return "rgba(0,195,0,1)";
                } else if (d.strength == 16) {
                    return "rgba(195,0,195,1)";
                } else {
                    return "rgba(195,0,0,1)";
                }
            })
            .attr("cursor", "move")
            .call(zoom);

        barGroup.selectAll(".timeBarstext")
            .data(d.dates)
            .enter()
            .append("text")
            .classed("timeBarstext", true)
            .attr("y", 4)
            .attr("fill", "white")
            .attr("text-anchor", "end")
            .attr("font-size", "11px")
            .text(function (d) { return d.dosage + d.dosage2; });
    });

    chart.call(zoom);

    var todayLine = chart.append("g"); //Appends a line indicatiin current date and month

    //Append triangle above the line
    todayLine.append("path")
        .attr("class", "todayTriangle")
        .attr("d", d3.svg.symbol().type("triangle-down"))
        .attr("transform", "translate(" + (x(today) - 220) + ", 60)")
        .attr("fill", "#999999");

    todayLine.append("line")
        .attr("class", "todayLine")
        .attr("y1", 62)
        .attr("y2", h - 25)
        .attr("stroke", "#999999")
        .attr("stroke-width", 2);

    // text above the today line
    todayLine.append("text")
        .attr("class", "todayLineText")
        .attr("y", 30)
        .attr("fill", "black")
        .attr("font-size", "11px")
        .text("Today " + monthNames[today.getMonth()] + " " + today.getDate());
    
    //Append the drug names on the y-axis, left side
    var yAxisLabel = chart.append("g");

    yAxisLabel.append("rect")
        .attr("class", "yAxisRect")
        .attr("x", 0)
        .attr("y", 54)
        .attr("width", 125)
        .attr("height", h + 50)
        .attr("stroke", "yellow")
        .attr("fill", "blue");

    medicines.each(function (d, i) {
        yAxisLabel.append("text")
            .attr("class", "yAxisText")
            .attr("y", y(i) + 3)
            .attr("x", 105)
            .attr("height", 100)
            .attr("stroke", "none")
            .attr("fill", "rgba(67,67,67,.5)")
            .attr("text-anchor", "end")
            .attr("font-size", "12px")
            .text(d.label);
    });

    ////////////////////////////////////////////////////////////////////////////////

    //This function updates the timeline bars when zooming or dragging based on the
    //x-axis and redraws them
    function updateBars() {
        medicines.each(function (d, i) {
            group = d3.select(this);

            group.select(".barGroup").selectAll(".timeBars").each(function (d) {
                d3.select(this)
                    .attr("x", function (d) { return x(d.startdate); })
                    .attr("width", function (d) { return x(d.enddate) - x(d.startdate); })
            });

            //Displays the dosage over the bars based on the width of the bars. If width is less than 30px the text
            //is not displayed
            group.select(".barGroup").selectAll(".timeBarstext").each(function (d) {
                d3.select(this).attr("x", function (d) { return x(d.startdate) + (x(d.enddate) - x(d.startdate)) - 8; })
                    .attr("fill", function (d) {
                        if ((x(d.enddate) - x(d.startdate)) < 30)
                            return "none";
                        else
                            return "white";
                    });
            });
        });
    }

    //Allows dragging the chart and zooming along the x-axis and based on the zoom/drag moves the brush
    //to indicate the region of the timeline that is in focus
    function zoomed() {
        // console.log(d3.event);
        if (d3.event.scale === 1) { // dragging
            if (d3.event.sourceEvent.webkitMovementX != null) {
                var dir = -d3.event.sourceEvent.webkitMovementX * .2;
            } else {
                var dir = -d3.event.translate[0] / 25;
            }

            var tx1 = x2(brush.extent()[0]) + dir;
            var tx2 = x2(brush.extent()[1]) + dir;

            if (tx1 < min + 1) {
                tx2 += min + 1 - tx1;
                tx1 = min + 1;
            }
            if (tx2 > w + m[1]) {
                tx1 += w + m[1] - tx2;
                tx2 = w + m[1];
            }
            d3.select(".extent").attr("x", tx1);
            brush.extent([x2.invert(tx1), x2.invert(tx2)]);
            x.domain(brush.extent());
            brushed();

            zoom.translate([0,0]);
        } else {
            var zScale = d3.event.scale;
            var mid = (x2(brush.extent()[1]) - x2(brush.extent()[0])) / 2 + x2(brush.extent()[0]);
            var zWidth = (x2(brush.extent()[1]) - x2(brush.extent()[0])) * zScale;

            var ts1 = mid - zWidth / 2;
            var ts2 = mid + zWidth / 2;

            if (zWidth > x2(minDate.setMonth(minDate.getMonth() + 1)) - min) {
                if (ts1 < min + 1)
                    ts1 = min + 1;

                if (ts2 > w + m[1])
                    ts2 = w + m[1];

                d3.select(".extent").attr("x", ts1);
                d3.select(".extent").attr("width", zWidth);

                brush.extent([x2.invert(ts1), x2.invert(ts2)])
                x.domain(brush.extent());
                brushed();
            }
            minDate.setMonth(minDate.getMonth() - 1);
            zoom.scale(1)
        }
    };

    //Allows brushing over the mini timeline and helps selecting a particular
    //section of the timeline
    function brushed() {
        x.domain(brush.extent());
        barGroup.selectAll(".timeBars").attr("x", function (d) { return x(d.startdate); });
        barGroup.attr("width", 5);
        chart.select("g.x.axis").call(xaxis);
        updateBars();
        updateTodayLine();
    }

    //Redraws the today line when zooming/dragging the timeline
    function updateTodayLine() {
        d3.select(".todayTriangle").attr("transform", "translate(" + (x(today) - 20) + ", 59)")
        d3.select(".todayLine").attr("x1", x(today) - 20)
            .attr("x2", x(today) - 20);

        d3.select(".todayLineText").attr("x", x(today) - 38)
            .attr("width", 10);
    }

    brushed();
}
