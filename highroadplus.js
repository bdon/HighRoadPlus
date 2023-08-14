// TODO: transition from zero
// and refine these values
const VALS_3  = ["match",["get","pmap:kind"],"highway",1,0];
const VALS_7  = ["match",["get","pmap:kind"],"highway",2,"major_road",1,"medium_road",1,0];
const VALS_18 = ["match",["get","pmap:kind"],"highway",32,"major_road",26,"medium_road",20,"minor_road",10,"other",6,0];

const ROAD_WIDTH = [
  "interpolate",
  ["exponential", 1.6],
  ["zoom"],
  3,
  VALS_3,
  7,
  VALS_7, 
  18,
  VALS_18
];

const ROAD_HIGHROADPLUS_WIDTH = [
  "interpolate",
  ["exponential", 1.6],
  ["zoom"],
  3,
  ["case",["has","casing"],2,VALS_3],
  7,
  ["case",["has","casing"],2,VALS_7],
  18,
  ["case",["has","casing"],2,VALS_18]
];

const ROAD_HIGHROADPLUS_GAP_WIDTH = [
  "interpolate",
  ["exponential", 1.6],
  ["zoom"],
  3,
  ["case",["has","casing"],VALS_3,0],
  7,
  ["case",["has","casing"],VALS_7,0],
  18,
  ["case",["has","casing"],VALS_18,0]
];

const IS_ROAD = ["in",["get","pmap:kind"],["literal",["highway","major_road","medium_road","minor_road","other"]]];

const LAYERS = [
  {
    id: "background",
    type: "background",
    paint:{
      "background-color":"#ccc"
    }
  },
  {
    id: "water",
    type: "fill",
    source: "protomaps",
    "source-layer":"water",
    paint:{
      "fill-color":"#80deea"
    }
  },
  {
    id: "roads_tunnels_2_minus",
    type: "line",
    source: "protomaps",
    "source-layer":"roads",
    "filter":["all",IS_ROAD,["==",["get","pmap:level"],-1],["<=",["get","layer"],2]],
    layout: {
      "line-sort-key":["get","layer"],
      "line-cap":"butt"
    },
    paint:{
      "line-color":["case",["has","casing"],"#ccc","#e2e2e2"],
      "line-opacity":["case",["has","casing"],1,1],
      "line-width":ROAD_HIGHROADPLUS_WIDTH,
      "line-gap-width":ROAD_HIGHROADPLUS_GAP_WIDTH
    }
  },
  {
    id: "roads_tunnels_casing",
    type: "line",
    source: "protomaps",
    "source-layer":"roads",
    "filter":["all",IS_ROAD,["==",["get","pmap:level"],-1],["==",["get","layer"],-1]],
    paint:{
      "line-dasharray":[2.5,0.5],
      "line-width":2,
      "line-gap-width":ROAD_WIDTH,
      "line-color":"#ccc"
    }
  },
  {
    id: "roads_tunnels",
    type: "line",
    source: "protomaps",
    "source-layer":"roads",
    "filter":["all",IS_ROAD,["==",["get","pmap:level"],-1],["==",["get","layer"],-1]],
    paint:{
      "line-color":"#e2e2e2",
      "line-width":ROAD_WIDTH
    }
  },
  {
    id: "roads_casing",
    type: "line",
    source: "protomaps",
    "source-layer":"roads",
    "filter":["all",IS_ROAD, ["==",["get","pmap:level"],0]],
    paint:{
      "line-width":1,
      "line-color":"#ccc",
      "line-gap-width":ROAD_WIDTH
    }
  },
  {
    id: "roads",
    type: "line",
    source: "protomaps",
    "source-layer":"roads",
    "filter":["all",IS_ROAD,["==",["get","pmap:level"],0]],
    paint:{
      "line-width":ROAD_WIDTH,
      "line-color":"white"
    }
  },
  {
    id: "bridges_1_casing",
    type: "line",
    source: "protomaps",
    "source-layer":"roads",
    "filter":["all",IS_ROAD,["==",["get","pmap:level"],1],["<=",["get","layer"],1]],
    paint:{
      "line-color":"#ccc",
      "line-width":2,
      "line-gap-width":ROAD_WIDTH
    }
  },
  {
    id: "bridges_1",
    type: "line",
    source: "protomaps",
    "source-layer":"roads",
    "filter":["all",IS_ROAD,["==",["get","pmap:level"],1],["<=",["get","layer"],1]],
    paint:{
      "line-width":ROAD_WIDTH,
      "line-color":"white"
    }
  },
  {
    id: "bridges_2_plus",
    type: "line",
    source: "protomaps",
    "source-layer":"roads",
    "filter":["all",IS_ROAD,["==",["get","pmap:level"],1],[">=",["get","layer"],2]],
    layout: {
      "line-sort-key":["+",["*",2,["get","layer"]],["case",["has","casing"],0,1]],
      "line-cap":"butt"
    },
    paint:{
      "line-color":["case",["has","casing"],"#ccc","white"],
      "line-width":ROAD_HIGHROADPLUS_WIDTH,
      "line-gap-width":ROAD_HIGHROADPLUS_GAP_WIDTH
    }
  },
  {
    id:"debug_labels",
    type:"symbol",
    source:"protomaps",
    "source-layer":"roads",
    minzoom:15,
    "filter":IS_ROAD,
    layout: {
      "text-field":["get","layer"],
      "text-font":["Barlow Bold"],
      "text-size":14,
      "symbol-placement":"line-center"
    },
    paint: {
      "text-halo-color":"white",
      "text-halo-width":2,
      "text-color":"#444"
    }
  }
];

