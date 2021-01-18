// Note: seems mentally easier to simply call exit().remove() and enter() to reset the graph each time
// Moral of the story: beware of indices when data get exit() or enter(). 
// sauce: https://academind.com/tutorials/d3js-basics/

const countryData = {
    items: ['China', 'India', 'USA'],
    // Declare some methods, like private methods of a class
    addItem(item) {
        this.items.push(item);
    },
    // remove item at index
    removeItem(index) {
        this.items.splice(index, 1);
    },
    // update an item in-place
    updateItem(index, newItem) {
        this.items[index] = newItem;
    }
};

// write some D3 as a function
function drawNamedRectangles(data) {
    d3.select("ul")
    .selectAll("li")
    .data(data.items, d => d) 
    .enter()
    .append("li")
    .text(data => data)

    // make Germany appear after 2s, with a green bg
    setTimeout(() => {
        data.addItem("Germany") //take for granted that the addItem() method was defined
        d3.select("ul")
        .selectAll("li")
        .data(data.items, d => d)
        .enter()
        .append("li")
        .classed("added", true)
        .text(data => data)
    }, 1000);

    // Remove China after 5s
    setTimeout(() => {
        data.removeItem(0) // Mark China as red on the DOM, to remove. 
        d3.select("ul")
        .selectAll("li") // all 4 countries currently exist on the DOM, but the data object now excludes China
        .data(data.items, d => d)
        .exit() // exit() grants access to the *redundant* item. Call .remove() to actually remove it.
        .classed("redundant", true)
    }, 2000);
    setTimeout(() => { // Actually remove China from the DOM. 
        d3.select("ul")
        .selectAll("li") 
        .data(data.items, d => d)
        .exit() 
        .remove()
    }, 3000);

    // Remove China after 5s
    setTimeout(() => {
        const newCountry = "Russia"
        data.updateItem(1, newCountry) // Update second item to Russia. Note which one the second item is! (It's not India)
        d3.select("ul")
        .selectAll("li")
        .data(data.items, d => d)
        .exit() // why is the updated class marked as *redundant*, s.t. the exit() method picks it up?
        .classed("updated", true)
        .text(newCountry) // replace text on the DOM from "USA" to "Russia"
    }, 4000);
}

drawNamedRectangles(countryData)
