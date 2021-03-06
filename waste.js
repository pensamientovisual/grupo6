var canvas = d3.select("#waste"),
  canvasNode = canvas.node(),
  context = canvasNode.getContext("2d");

var numSamplesPerFrame = 5,
  numSamples = 0;

var width = canvasNode.width,
  height = canvasNode.height,
  outerRadius = (Math.min(width, height) - 5) / 2,
  innerRadius = outerRadius / 4;

var outerRadius2 = outerRadius * outerRadius,
  innerRadius2 = innerRadius * innerRadius,
  k = outerRadius2 - innerRadius2;

context.translate(width / 2, height / 2);

context.save();
context.beginPath();
context.arc(0, 0, outerRadius, 0, 2 * Math.PI);
context.moveTo(innerRadius, 0);
context.arc(0, 0, innerRadius, 2 * Math.PI, 0);
context.fillStyle = "rgba(0,0,0,.2)";
context.fill("evenodd");
context.restore();

context.fillStyle = "rgba(95,23,98,.8)";
d3.timer(function () {
  for (var i = 0; i < numSamplesPerFrame; ++i) {
    var a = Math.random() * 2 * Math.PI,
      r = Math.sqrt(Math.random() * k + innerRadius2),
      x = r * Math.cos(a),
      y = r * Math.sin(a);
    context.beginPath();
    context.arc(x, y, 1, 0, 2 * Math.PI);
    context.fill();
  }
  return ++numSamples > 2000;
});
