const DUMMY_DATA = [
  { id: "d1", region: "USA", value: 10 },
  { id: "d2", region: "India", value: 12 },
  { id: "d3", region: "China", value: 11 },
  { id: "d4", region: "Germany", value: 6 },
];

const MARGINS = { top: 20, bottom: 10 }; // internal padding
const CHART_WIDTH = 600;
const CHART_HEIGHT = 400 - MARGINS.top - MARGINS.bottom;

let selectedData = DUMMY_DATA;

const x = d3.scaleBand().rangeRound([0, CHART_WIDTH]).padding(0.1);
const y = d3.scaleLinear().range([CHART_HEIGHT, 0]);

const chartContainer = d3
  .select("svg")
  .attr("width", CHART_WIDTH)
  .attr("height", CHART_HEIGHT);

x.domain(DUMMY_DATA.map((d) => d.region));
y.domain([0, d3.max(DUMMY_DATA, (d) => d.value) * 1.25]);

const chart = chartContainer.append("g");

// add horizontal axis
chart
  .append("g")
  .call(d3.axisBottom(x).tickSizeOuter(0))
  .attr("color", "#4f009e")
  .attr("transform", `translate(0, ${CHART_HEIGHT})`);

function renderChart() {
  // add bars
  chart
    .selectAll(".bar")
    .data(selectedData, data => data.id)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("width", x.bandwidth())
    .attr("height", (data) => CHART_HEIGHT - y(data.value))
    .attr("x", (data) => x(data.region))
    .attr("y", (data) => y(data.value))
    .attr("fill", "blue");

  chart.selectAll(".bar")
  .data(selectedData, data => data.id)
  .exit()
  .remove()

  // add value labels just above bars
  chart
    .selectAll(".label")
    .data(selectedData, data => data.id)
    .enter()
    .append("text")
    .text((data) => data.value)
    .attr("x", (data) => x(data.region) + x.bandwidth() / 2)
    .attr("y", (data) => y(data.value) * 0.95)
    .attr("text-anchor", "middle")
    .classed("label", true);
  
  chart.selectAll(".label")
  .data(selectedData, data => data.id)
  .exit()
  .remove();
}

const listItems = d3
  .select("#data")
  .select("ul")
  .selectAll("li")
  .data(DUMMY_DATA)
  .enter()
  .append("li");

// init chart
renderChart();
// add checkbox menu
let unselectedIds = [];

listItems.append("span").text((data) => data.region);

listItems
  .append("input")
  .attr("type", "checkbox")
  .attr("checked", true)
  .on("change", (data) => {
    if (unselectedIds.indexOf(data.id) === -1) {
      //if that particular row is not in unselectedIds
      unselectedIds.push(data.id); //add
    } else {
      unselectedIds = unselectedIds.filter(id => id !== data.id); //remove
    }
    // update selectedData to be filter out unselected IDs
    selectedData = DUMMY_DATA.filter(
      (d) => unselectedIds.indexOf(d.id) === -1
    );
    console.log(selectedData)
    renderChart(); // re-render the whole chart upon each checkbox change
  });
