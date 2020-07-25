import React, { useContext, useEffect, useState } from "react";
import { GeoStore, GeoActionType } from "../../../contexts/geoContext";
import { LocationInput } from "../../../API";
import mapboxgl from "mapbox-gl";
import { symptomsToGeoJSON, initData } from "./mapUtils";
import {
  cluster,
  clusterCount,
  unclustered,
  heatmap,
  heatmapPoint,
  main,
} from "./mapSetting";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN as string;

interface MapProps {
  movements: { location: LocationInput; updatedAt: string }[];
  layer: "main" | "cluster" | "heatmap";
}

const Map: React.FC<MapProps> = ({ movements, layer }) => {
  const { state } = useContext(GeoStore);
  const { dispatch } = useContext(GeoStore);
  const [map, setMap] = useState<mapboxgl.Map>();

  let ref: any;

  const mapContainerStyle = {
    height: "100%",
    width: "100%",
    borderRadius: 20,
  };

  useEffect(() => {
    let map = new mapboxgl.Map({
      container: ref,
      style: "mapbox://styles/mapbox/light-v10",
      center: [139.7745, 35.7023],
      zoom: 10,
    });
    setMap(undefined);

    let geolocator = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
    });

    geolocator.on("geolocate", (event: any) => {
      dispatch({
        type: GeoActionType.setLocation,
        longitude: event.coords.longitude,
        latitude: event.coords.latitude,
      });
    });

    map.on("load", () => {
      map.addControl(geolocator);

      map.addSource("symptoms", {
        type: "geojson",
        data: initData,
      });
      map.addSource("symptoms-cluster", {
        type: "geojson",
        data: initData,
        cluster: true,
      });

      map.addLayer(main);
      map.addLayer(cluster);
      map.addLayer(clusterCount);
      map.addLayer(unclustered);
      map.addLayer(heatmap, "waterway-label");
      map.addLayer(heatmapPoint, "waterway-label");

      setMap(map);
    });
  }, []);

  useEffect(() => {
    if (!map) return;

    const data = symptomsToGeoJSON(
      movements
        .filter((movement) => movement.location)
        .map((movement) => {
          const { location, ...rest } = movement;
          return {
            lat: movement.location.lat,
            lon: movement.location.lon,
            ...rest,
          };
        })
    );
    let pointSource = map.getSource("symptoms") as mapboxgl.GeoJSONSource;
    let clusterSource = map.getSource(
      "symptoms-cluster"
    ) as mapboxgl.GeoJSONSource;
    pointSource.setData(data);
    clusterSource.setData(data);
  }, [map, movements]);

  useEffect(() => {
    if (!map) return;

    const mainVisibility = layer === "main" ? "visible" : "none";
    const clusterVisibility = layer === "cluster" ? "visible" : "none";
    const heatmapVisibility = layer === "heatmap" ? "visible" : "none";

    map.setLayoutProperty("main", "visibility", mainVisibility);
    map.setLayoutProperty("clusters", "visibility", clusterVisibility);
    map.setLayoutProperty("cluster-count", "visibility", clusterVisibility);
    map.setLayoutProperty("unclustered-point", "visibility", clusterVisibility);
    map.setLayoutProperty("symptoms-heat", "visibility", heatmapVisibility);
    map.setLayoutProperty("symptoms-point", "visibility", heatmapVisibility);
  }, [map, layer]);

  return (
    <>
      <div style={mapContainerStyle} ref={(el) => (ref = el)} />
    </>
  );
};

export default Map;
