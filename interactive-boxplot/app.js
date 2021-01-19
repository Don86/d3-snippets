
// set globals
const MARGIN = { top: 10, right: 30, bottom: 30, left: 40 },
    WIDTH = 460 - MARGIN.left - MARGIN.right,
    HEIGHT = 400 - MARGIN.top - MARGIN.bottom;
// listing params
const BAR_WIDTH = 150
const BAR_HEIGHT = 30

// Init boxplot SVG element
var svg = d3.select("#feature_boxplot")
    .append("svg")
    .attr("width", WIDTH + MARGIN.left + MARGIN.right)
    .attr("height", HEIGHT + MARGIN.top + MARGIN.bottom)
    .append("g")
    .attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")");

d3.json("./sample_score_data.json", function (data) {
    const arr = data.map(d => d.player)
    console.log(data)
    console.log(arr)
})

d3.csv("./boxplot_iris_data.csv", function (data) {
    // =============== create listing ===============
    const featureNames = Object.keys(data[0]);
    const LISTING_HEIGHT = BAR_HEIGHT * featureNames.length * 1.25
    const yBarScale = d3.scaleBand().range([LISTING_HEIGHT, 0]).domain(featureNames)
    console.log(data)
    // Init listing SVG element
    var svgListing = d3.select("#listing")
        .append("svg")
        .attr("width", BAR_WIDTH + MARGIN.left + MARGIN.right)
        .attr("height", BAR_HEIGHT * featureNames.length * 1.2)
        .append("g")
        .attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")");

    // draw rectangles
    svgListing.selectAll(".listingBar")
        .data(featureNames)
        .enter().append("rect")
        .attr("class", "listingBar")
        .attr("width", BAR_WIDTH)
        .attr("height", BAR_HEIGHT)
        .attr("y", (featureNames) => (yBarScale(featureNames)))
        .style("fill", "#33A2FF")

    // add text
    svgListing.selectAll(".text")
        .data(featureNames)
        .enter().append("text")
        .attr("class", "listingLabel")
        //.attr("x", 
        .attr("y", (featureNames) => (yBarScale(featureNames)))
        .attr("dy", ".75em")
        .text(featureNames => featureNames);

    // =============== draw boxplot ===============
    // boxplot X scale
    const xScale = d3.scaleBand()
        .range([0, WIDTH])
        .domain(["setosa", "versicolor", "virginica"])
        .paddingInner(1)
        .paddingOuter(.5)
    svg.append("g")
        .attr("transform", "translate(0," + HEIGHT + ")")
        .call(d3.axisBottom(xScale));

    // boxplot Y scale
    const boxplot_domain = [0, ]
    const yScale = d3.scaleLinear().domain([3, 9]).range([HEIGHT, 0])
    svg.append("g").call(d3.axisLeft(yScale));

    // Add individual points with jitter
    const jitterWidth = 50
    svg.selectAll("indPoints")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => (xScale(d.Species) - jitterWidth / 2 + Math.random() * jitterWidth))
        .attr("cy", (d) => (yScale(d.Sepal_Length)))
        .attr("r", 4)
        .style("fill", "white")
        .attr("stroke", "black");
});