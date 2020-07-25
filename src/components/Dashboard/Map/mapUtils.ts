const FEATURE_COLLECTION: "FeatureCollection" = "FeatureCollection";
const FEATURE: "Feature" = "Feature";
const POINT: "Point" = "Point";

export const initData: any = {
  type: "FeatureCollection",
  features: [],
};

export const symptomsToGeoJSON = (symptoms: any[]) => {
  let features = symptoms.map((symptom) => {
    let { lat, lon, ...rest } = symptom;
    return {
      geometry: {
        type: POINT,
        coordinates: [symptom.lon, symptom.lat],
      },
      type: FEATURE,
      properties: {
        ...rest,
      },
    };
  });

  return { type: FEATURE_COLLECTION, features };
};

export const safeAddSource = (
  map: mapboxgl.Map | undefined,
  id: string,
  sourceData: any
) => {
  const source: mapboxgl.GeoJSONSource = map?.getSource(
    id
  ) as mapboxgl.GeoJSONSource;
  if (source) {
    source.setData(sourceData);
  } else {
    map?.addSource(id, sourceData);
  }
};
