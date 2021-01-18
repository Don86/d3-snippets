// HOW ENTER WORKS, FINALLY
// sauce: https://www.youtube.com/watch?v=TOJ9yjvlapY
// Read comments carefully from top to bottom

const DUMMY_DATA = [
    { id: "d1", value: 10, region: "USA" },
    { id: "d2", value: 11, region: "India" },
    { id: "d3", value: 12, region: "China" },
    { id: "d4", value: 16, region: "Germany" },
]

// ========== basic Enter() concept ==========
d3.select("#div1")
    .selectAll("p") // this is written even though there are no `p` elements in index.html
    .data(DUMMY_DATA) // bind data to all `p`. data should be an array of stuff (strings, JS objects...)
    .enter() // `enter` returns any `p` elements that are *missing*. This works when first initializing because there are no `p` tags.
    .append("p") // for each missing element, now appends a new `p` element. 
    // uncomment each ".text" line to see what's rendered!
    //.text(data => data.region) 
    //.text(data => data.id)
    .text(data => data.value)

// ========== Using Enter().append() to draw some rectangles ==========
// create container element inside div2 to contain a bar chart
const container = d3.select("#div2")
    .classed("container", true)
    .style("border", "1px solid red")

// create bar elements
const bars = container
    .selectAll("#bar") // selectAll elements by class="bar". Make sure that the elements to be created will have the class "bar" later.
    .data(DUMMY_DATA)
    .enter()
    .append("div")
    .classed("bar", true)
    .style("width", "50px")
    .style("height", data => (data.value * 10) + "px"); 

// ========== Doing it with SVG ==========