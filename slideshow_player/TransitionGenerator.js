var GlslTransitions = require("glsl-transitions");
var byName = {};
GlslTransitions.forEach(function (t) {
  byName[t.name] = t;
});
var transitions = [
  [ "cube", function () {
    return { persp: 0.9 - Math.random()*Math.random(), unzoom: Math.random()*Math.random() };
  } ],
  "undulating burn out",
  [ "CrossZoom", function () {
    return { strength: 0.5 * Math.random() };
  } ],
  "glitch displace",
  "crosshatch",
  "PageCurl",
  [ "Mosaic", function () {
    var dx = Math.round(Math.random() * 6 - 3), dy = Math.round(Math.random() * 6 - 3);
    if (dx===0 && dy===0) dy = -1;
    return { endx: dx, endy: dy };
  } ],
  [ "DoomScreenTransition", function () {
    return {
      barWidth: Math.round(6 + 20 * Math.random()),
      amplitude: 2 * Math.random(),
      noise: 0.5 * Math.random(),
      frequency: Math.random()
    };
  } ],
  [ "colourDistance", function () {
    return { interpolationPower: 6 * Math.random() };
  } ],
  [ "swap", function () {
    return { depth: 1 + 4 * Math.random(), perspective: 0.9 + Math.random() * Math.random() };
  } ],
  [ "doorway", function () {
    return { perspective: Math.random() * Math.random(), depth: 1 + 10 * Math.random() * Math.random() };
  } ],
  "Star Wipe",
  "pinwheel",
  [ "Slide", function () {
    var choices = [
      { translateX: 0, translateY: -1 },
      { translateX: 0, translateY: 1 },
      { translateX: -1, translateY: 0 },
      { translateX: 1, translateY: 0 }
    ];
    return choices[Math.floor(choices.length * Math.random())];
  } ],
  "SimpleFlip",
  "TilesScanline",
  "Dreamy",
  "Swirl",
  "HSVfade",
  [ "burn", function () {
    return { color: [0,0,0].map(Math.random) };
  } ],
  "Radial",
  [ "ripple", function () {
    return {
      amplitude: 200 * Math.random(),
      speed: 200 * Math.random()
    }
  } ],
  "morph",
  ["ButterflyWaveScrawler", function () {
    return {
      amplitude: Math.random(),
      waves: 100 * Math.random() * Math.random(),
      colorSeparation: 0.8 * Math.random() * Math.random()
    };
  } ],
  [ "flash", function () {
    return { flashIntensity: 4 * Math.random() };
  } ],
  [ "randomsquares", function () {
    var size = Math.round(4 + 30 * Math.random());
    return {
      size: [ size, size ],
      smoothness: Math.random()
    };
  } ],
  [ "flyeye", function () {
    return {
      size: Math.random() * Math.random(),
      zoom: 200 * Math.random() * Math.random(),
      colorSeparation: 0.8 * Math.random() * Math.random()
    };
  } ],
  "squeeze",
  [ "directionalwipe", function () {
    var angle = Math.random() * 2 * Math.PI;
    return {
      direction: [ Math.cos(angle), Math.sin(angle) ]
    };
  } ],
  "circleopen",
  [ "wind", function () {
    return { size: 0.5 * Math.random() };
  } ],
  [ "fadecolor", function () {
    return { color: [0,0,0].map(Math.random) };
  } ]
].map(function (obj) {
  var name, genUniforms;
  if (typeof obj === "string")
    name = obj;
  else {
    name = obj[0];
    genUniforms = obj[1];
  }
  if (!(name in byName)) throw new Error("no transition called "+name);
  var t = byName[name];
  return {
    transition: t,
    name: name,
    genUniforms: genUniforms
  };
});

function random () {
  var i = Math.floor(Math.random() * transitions.length);
  var t = transitions[i];
  var uniforms = t.genUniforms && t.genUniforms() || {};
  return {
    name: t.name,
    uniforms: uniforms
  };
}

module.exports = {
  transitions: transitions.map(function (o) {
    return o.transition;
  }),
  random: random
};
