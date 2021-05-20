const render = (function () {
  // keys for concentric circles
  const dataKeys = [
    "chernobil",
    "fukushima",
    "mayak",
    "threemileisland",
    "constituyentes",
    "tokaimura",
  ];

  // helpers
  const width = 700;
  const height = 800;

  const t = d3.transition().duration(400).ease("linear");
  // pass in a full value (student number)
  // and pass in the percentage to calculate number
  // these are relative to the total students of 'a' uni
  function students(total, part) {
    const percentage = d3
      .scaleLinear()
      .domain([0, 100]) // pass in a percent
      .range([0, total]);

    return percentage(part);
  }

  // colour each circle
  const sequentialScale = d3
    .scaleSequential()
    .domain([0, 4])
    .interpolator(d3.interpolateRainbow);
  // colour each circle
  const col = d3
    .scaleOrdinal()
    .domain(dataKeys)
    .range(["#f1c40f", "#f39c12", "#e67e22", "#c0392b", "blue"].reverse());

  const labels = d3
    .scaleOrdinal()
    .domain(dataKeys)
    .range([
      "Chernobil, Ukrania",
      "Fukushima, Japon",
      "Mayak, Rusia",
      "Windscale, UK",
      "Three Mile Island, USA",
      "Constituyentes, Argentina",
      "Tokaimura, Japon",
    ]);

  function update(data, bindTo) {
    const maxStudents = 7;
    // area of each circle taking the highest number of students
    const sqrtScale = d3.scaleSqrt().domain([0, maxStudents]).range([0, 200]);
    // render grid
    const update = d3.select(bindTo).selectAll(".js-circle").data(data);

    update.exit().remove();

    const enter = update.enter().append("div").attr("class", "block js-circle");
    // svg in each grid
    const svg = enter
      .append("svg")
      .attr("class", (d, i) => "js-svg svg-" + i)
      .attr("width", width)
      .attr("height", height);

    // label for selected circle
    const circleInfo = enter
      .append("h3")
      .attr("class", (d, i) => "block js-circle-info js-circle-info-" + i)
      .html(
        d => `<span>Fukushima, Japon </span> <br/> <span>${d.fukushima}</span>`
      );

    // append set of circles for each of the datakeys
    // to each grid item
    data.forEach(function (o, n) {
      // extract the data and order it
      // ensuring circles render largest to smallest
      let list = [];
      // create a list using the keys for the circles and current data object
      dataKeys.forEach(function (_k, _n) {
        return list.push({
          value: o[_k], // reference the value using the key
          name: _k, // reference the name
        });
      });
      // sort it in descending order
      list.sort(function (x, y) {
        return d3.ascending(y.value, x.value);
      });
      // render the set of circles
      d3.select(".svg-" + n)
        .selectAll("circle")
        .data(list)
        .enter()
        .append("circle")
        .attr("class", (d, i) => `cc c-${i} ${d.name}`)
        .attr("r", d => {
          return sqrtScale(o[d.name]);
        })
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .style("fill", "transparent")
        .style("stroke-width", 7)
        .style("stroke", d => col(d.name))
        .on("mouseover", function (d, i) {
          mouseoverValues(d.name);
          mouseOverHighlight(i);
        })
        .on("mouseout", function (d) {
          mouseOutReset(d);
        });
    });

    function mouseoverValues(key) {
      circleInfo.html(
        d => `<span>${labels(key)}</span> <br/> <span>${d[key]}</span>`
      );
    }

    function mouseOverHighlight(index) {
      d3.selectAll(".cc").interrupt().transition(t).style("opacity", 0.1);
      d3.selectAll(".c-" + index)
        .interrupt()
        .transition(t)
        .style("opacity", 1);
    }
    function mouseOutReset(d) {
      d3.selectAll(".cc").interrupt().transition(t).style("opacity", 1);
      circleInfo.html(
        d => `<span>Fukushima, Japon </span> <br/> <span>${d.fukushima}</span>`
      );
    }

    function legend() {
      const legend = d3
        .select("#legend")
        .append("svg")
        .attr("class", "js-legend")
        .attr("width", 700)
        .attr("height", 40);
      legend
        .selectAll("rect.legend-items")
        .data(dataKeys)
        .enter()
        .append("rect")
        .attr("class", "legend-items")
        .attr("width", 163)
        .attr("height", 30)
        .attr("fill", d => col(d))
        .attr("y", 0)
        .attr("x", (d, i) => i * 166)
        .on("mouseover", function (d, i) {
          mouseoverValues(d);
          mouseOverHighlight(i);
        })
        .on("mouseout", function (d) {
          mouseOutReset(d);
        });
      legend
        .selectAll("text.legend-lables")
        .data(dataKeys)
        .enter()
        .append("text")
        .attr("class", "legend-labels")
        .attr("y", 20)
        .attr("x", (d, i) => i * 166 + 10)
        .text(d => labels(d));
    }
    legend();
  }

  return update;
})();

d3.json("data/data.json", function (error, data) {
  render(data, "#vis");
});

// change frame height
d3.select(self.frameElement).style("height", "1250px");
