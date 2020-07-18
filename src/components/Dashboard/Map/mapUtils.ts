export const symptomsToGeoJSON = (symptoms: any[]) => {
  const FEATURE_COLLECTION: "FeatureCollection" = "FeatureCollection";
  const FEATURE: "Feature" = "Feature";
  const POINT: "Point" = "Point";
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

export const safeRemoveLayer = (map: mapboxgl.Map | undefined, id: string) => {
  if (map?.getLayer(id)) map.removeLayer(id);
};

export const safeAddSource = (
  map: mapboxgl.Map | undefined,
  id: string,
  sourceData: mapboxgl.AnySourceData
) => {
  if (map?.getSource(id)) map.removeSource(id);
  map?.addSource(id, sourceData);
};
