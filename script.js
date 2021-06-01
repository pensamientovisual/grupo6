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

  const moreData = {
    chernobil: {
      deaths: 9000,
      radius: "~30km",
      comment: "Es el accidente más mediático de la historia.",
    },
    constituyentes: {
      deaths: "1",
      radius: "~10km",
      comment:
        "Como el accidente ocurrió durante dictadura, durante mucho tiempo el gobierno argentino intentó esconder el incidente.",
    },
    threemileisland: {
      deaths: "0",
      radius: "~16km",
      comment:
        "A pesar de que no hubo muertos, se reportó un aumento significativo en el riesgo de padecer un cáncer en la población local.",
    },
    fukushima: {
      deaths: "1600",
      radius: "~80km",
      comment: "Impulsó el movimiento anti-nuclear a nivel mundial.",
    },
    mayak: {
      deaths: "200",
      radius: "~16km",
      comment:
        "Ocurrió durante la guerra fría, por lo que hubo una secretismo total, manteniéndose en cubierto durante 2 décadas.",
    },
    tokaimura: {
      deaths: "2",
      radius: "~10km",
      comment:
        "El incidente resultó en una baja notable en la producción agrícola local.",
    },
  };

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
    .range(["#d6f789", "#adf046", "#64e31a", "#27801d", "#114715"].reverse());

  const labels = d3
    .scaleOrdinal()
    .domain(dataKeys)
    .range([
      "Chernobil, Ukrania, 1986",
      "Fukushima, Japon, 2011",
      "Mayak, Rusia, 1957",
      "Windscale, UK, 1957",
      "Three Mile Island, USA, 1979",
      "Constituyentes, Argentina, 1983",
      "Tokaimura, Japon, 1999",
    ]);

  function update(data, bindTo) {
    const maxStudents = 7;
    // area of each circle taking the highest number of students
    const sqrtScale = d3.scaleSqrt().domain([0, maxStudents]).range([0, 300]);
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
      .style("bottom", "-105px")
      .attr("class", (d, i) => "block js-circle-info js-circle-info-" + i)
      .html(
        d =>
          `<span>Fukushima, Japon, 2011 </span> <br/> <span>INES ${d.fukushima}</span><br><span>Muertes: ${moreData["fukushima"].deaths}</span><br><span>Radio: ${moreData["fukushima"].radius}</span>`
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
        d =>
          `<span>${labels(key)}</span> <br/> <span>INES ${
            d[key]
          }</span><br><span>${moreData[key].comment}</span><br><span>Muertes: ${
            moreData[key].deaths
          }</span><br><span>Radio: ${moreData[key].radius}</span>`
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
        d =>
          `<span>Fukushima, Japon, 2011 </span> <br/> <span>INES ${d.fukushima}</span><br><span>${moreData["fukushima"].comment}</span><br><span>Muertes: ${moreData["fukushima"].deaths}</span><br><span>Radio: ${moreData["fukushima"].radius}</span>`
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
