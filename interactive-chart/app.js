const DUMMY_DATA = [
  { id: "d1", region: "USA", value: 10 },
  { id: "d2", region: "India", value: 12 },
  { id: "d3", region: "China", value: 11 },
  { id: "d4", region: "Germany", value: 6 },
];

const CHART_WIDTH = 600;
const CHART_HEIGHT = 400;

const x = d3.scaleBand().rangeRound([0, CHART_WIDTH]); 
const y = d3.scaleLinear();

const chartContainer = d3
  .select("svg")
  .attr("width", CHART_WIDTH)
  .attr("height", CHART_HEIGHT);

const chart = chartContainer.append("g");

chart
.selectAll(".bar")
.data(DUMMY_DATA)
.enter()
.append("rect")
.classed("bar", true)
.attr("width")
.attr("height");
