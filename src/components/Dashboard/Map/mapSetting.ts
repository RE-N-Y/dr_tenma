export const main: any = {
  id: "main",
  type: "circle",
  source: "symptoms",
  paint: {
    "circle-color": "#11b4da",
    "circle-radius": 4,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff",
  },
};

export const cluster: any = {
  id: "clusters",
  type: "circle",
  source: "symptoms-cluster",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#e9af9e",
      100,
      "#b7604b",
      750,
      "#7f0000",
    ],
    "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
  },
};

export const clusterCount: any = {
  id: "cluster-count",
  type: "symbol",
  source: "symptoms-cluster",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
};

export const unclustered: any = {
  id: "unclustered-point",
  type: "circle",
  source: "symptoms-cluster",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "#11b4da",
    "circle-radius": 4,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff",
  },
};

export const heatmap: any = {
  id: "symptoms-heat",
  type: "heatmap",
  source: "symptoms",
  maxzoom: 9,
  paint: {
    // Increase the heatmap weight based on frequency and property magnitude
    "heatmap-weight": ["interpolate", ["linear"], ["get", "mag"], 0, 0, 6, 1],
    // Increase the heatmap color weight weight by zoom level
    // heatmap-intensity is a multiplier on top of heatmap-weight
    "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 9, 3],
    // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
    // Begin color ramp at 0-stop with a 0-transparancy color
    // to create a blur-like effect.
    "heatmap-color": [
      "interpolate",
      ["linear"],
      ["heatmap-density"],
      0,
      "rgba(33,102,172,0)",
      0.2,
      "rgb(103,169,207)",
      0.4,
      "rgb(209,229,240)",
      0.6,
      "rgb(253,219,199)",
      0.8,
      "rgb(239,138,98)",
      1,
      "rgb(178,24,43)",
    ],
    // Adjust the heatmap radius by zoom level
    "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 9, 20],
    // Transition from heatmap to circle layer by zoom level
    "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 9, 0],
  },
};

export const heatmapPoint: any = {
  id: "symptoms-point",
  type: "circle",
  source: "symptoms",
  minzoom: 7,
  paint: {
    // Size circle radius by earthquake magnitude and zoom level
    "circle-radius": [
      "interpolate",
      ["linear"],
      ["zoom"],
      7,
      ["interpolate", ["linear"], ["get", "mag"], 1, 1, 6, 4],
      16,
      ["interpolate", ["linear"], ["get", "mag"], 1, 5, 6, 50],
    ],
    // Color circle by earthquake magnitude
    "circle-color": [
      "interpolate",
      ["linear"],
      ["get", "mag"],
      1,
      "rgba(33,102,172,0)",
      2,
      "rgb(103,169,207)",
      3,
      "rgb(209,229,240)",
      4,
      "rgb(253,219,199)",
      5,
      "rgb(239,138,98)",
      6,
      "rgb(178,24,43)",
    ],
    "circle-stroke-color": "white",
    "circle-stroke-width": 1,
    // Transition from heatmap to circle layer by zoom level
    "circle-opacity": ["interpolate", ["linear"], ["zoom"], 7, 0, 8, 1],
  },
};

export const searchCircle: any = {
  id: "search-circle",
  type: "circle",
  source: "search-point",
  paint: {
    "circle-radius": 10,
    "circle-color": "#3887be",
  },
};

export const searchRadius: any = {
  id: "search-radius",
  type: "fill",
  source: "search-circle",
  layout: {},
  paint: {
    "fill-color": "#088",
    "fill-opacity": 0.8,
  },
};
