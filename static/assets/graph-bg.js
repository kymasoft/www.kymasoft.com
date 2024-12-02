(function () {
  var svg = document.getElementById("graph-bg");
  if (!svg) return;

  var ns = "http://www.w3.org/2000/svg";
  var width = 160;
  var height = 100;
  var points = [
    { id: "o0", x: 80, y: 14, r: 3.6, ring: "outer" },
    { id: "o1", x: 118, y: 30, r: 3.6, ring: "outer" },
    { id: "o2", x: 118, y: 70, r: 3.6, ring: "outer" },
    { id: "o3", x: 80, y: 86, r: 3.6, ring: "outer" },
    { id: "o4", x: 42, y: 70, r: 3.6, ring: "outer" },
    { id: "o5", x: 42, y: 30, r: 3.6, ring: "outer" },
    { id: "i0", x: 80, y: 25, r: 3.1, ring: "inner" },
    { id: "i1", x: 104, y: 35, r: 3.1, ring: "inner" },
    { id: "i2", x: 104, y: 65, r: 3.1, ring: "inner" },
    { id: "i3", x: 80, y: 75, r: 3.1, ring: "inner" },
    { id: "i4", x: 56, y: 65, r: 3.1, ring: "inner" },
    { id: "i5", x: 56, y: 35, r: 3.1, ring: "inner" },
  ];

  var edges = [
    ["o0", "o1"],
    ["o1", "o2"],
    ["o2", "o3"],
    ["o3", "o4"],
    ["o4", "o5"],
    ["o5", "o0"],
    ["i0", "i1"],
    ["i1", "i2"],
    ["i2", "i3"],
    ["i3", "i4"],
    ["i4", "i5"],
    ["i5", "i0"],
    ["o0", "i0"],
    ["o1", "i1"],
    ["o2", "i2"],
    ["o3", "i3"],
    ["o4", "i4"],
    ["o5", "i5"],
    ["i0", "i3"],
    ["i1", "i4"],
    ["i2", "i5"],
  ];

  var lineGroup = document.createElementNS(ns, "g");
  var nodeGroup = document.createElementNS(ns, "g");
  svg.appendChild(lineGroup);
  svg.appendChild(nodeGroup);

  var lineEls = edges.map(function () {
    var line = document.createElementNS(ns, "line");
    line.setAttribute("stroke", "rgba(8, 101, 162, 0.34)");
    line.setAttribute("stroke-width", "1.8");
    line.setAttribute("stroke-linecap", "round");
    lineGroup.appendChild(line);
    return line;
  });

  var nodeEls = points.map(function (p) {
    var c = document.createElementNS(ns, "circle");
    c.setAttribute("r", String(p.r));
    c.setAttribute("fill", p.ring === "inner" ? "#e2f2ff" : "#ffffff");
    c.setAttribute(
      "stroke",
      p.ring === "inner" ? "#0a86d8" : "rgba(8, 64, 103, 0.36)",
    );
    c.setAttribute("stroke-width", p.ring === "inner" ? "1.2" : "1");
    nodeGroup.appendChild(c);
    return c;
  });

  function p(id) {
    for (var i = 0; i < points.length; i++)
      if (points[i].id === id) return points[i];
    return null;
  }

  function draw(t) {
    var tt = t * 0.001;
    var wobbleX = Math.sin(tt * 0.6) * 1.7;
    var wobbleY = Math.cos(tt * 0.47) * 1.2;
    var depth = (Math.sin(tt * 0.75) + 1) / 2;

    svg.setAttribute(
      "viewBox",
      (0 + wobbleX).toFixed(2) +
        " " +
        (0 + wobbleY).toFixed(2) +
        " " +
        (width - depth * 5).toFixed(2) +
        " " +
        (height - depth * 2.6).toFixed(2),
    );

    var animated = points.map(function (pt, idx) {
      var speed = pt.ring === "inner" ? 2.1 : 1.5;
      var phase = idx * 0.55;
      var x =
        pt.x + Math.sin(tt * speed + phase) * (pt.ring === "inner" ? 1.8 : 2.6);
      var y =
        pt.y +
        Math.cos(tt * speed * 0.95 + phase) * (pt.ring === "inner" ? 1.7 : 2.2);
      return { id: pt.id, x: x, y: y };
    });

    function a(id) {
      for (var j = 0; j < animated.length; j++)
        if (animated[j].id === id) return animated[j];
      return null;
    }

    for (var i = 0; i < edges.length; i++) {
      var from = a(edges[i][0]);
      var to = a(edges[i][1]);
      var l = lineEls[i];
      l.setAttribute("x1", from.x.toFixed(2));
      l.setAttribute("y1", from.y.toFixed(2));
      l.setAttribute("x2", to.x.toFixed(2));
      l.setAttribute("y2", to.y.toFixed(2));
      l.setAttribute(
        "stroke-opacity",
        (0.25 + Math.sin(tt * 2 + i * 0.2) * 0.09).toFixed(2),
      );
    }

    for (var k = 0; k < animated.length; k++) {
      nodeEls[k].setAttribute("cx", animated[k].x.toFixed(2));
      nodeEls[k].setAttribute("cy", animated[k].y.toFixed(2));
    }

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
})();
