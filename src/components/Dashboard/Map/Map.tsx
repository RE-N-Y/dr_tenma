import React, { useContext, useEffect, useState } from "react";
import { GeoStore, GeoActionType } from "../../../contexts/geoContext";
import { LocationInput } from "../../../API";
import mapboxgl from "mapbox-gl";
import { symptomsToGeoJSON, safeRemoveLayer, safeAddSource } from "./mapUtils";
import {
  cluster,
  clusterCount,
  unclustered,
  heatmap,
  heatmapPoint,
} from "./mapSetting";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN as string;

interface MapProps {
  movements: { location: LocationInput; updatedAt: string }[];
  useHeatmap: boolean;
  useCluster: boolean;
}

const Map: React.FC<MapProps> = ({ movements, useCluster, useHeatmap }) => {
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
      setMap(map);
    });

    map.on("dragstart", (event) => {
      console.log(event);
    });

    map.on("dragend", (event) => {
      console.log(event);
    });
  }, []);

  useEffect(() => {
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

    safeAddSource(map, "symptoms", {
      type: "geojson",
      data,
    });
    safeAddSource(map, "symptoms-cluster", {
      type: "geojson",
      data,
      cluster: true,
    });
  }, [movements]);

  useEffect(() => {
    if (!map) return;

    if (useCluster && map) {
      map.addLayer(cluster);
      map.addLayer(clusterCount);
      map.addLayer(unclustered);
    } else {
      safeRemoveLayer(map, "clusters");
      safeRemoveLayer(map, "cluster-count");
      safeRemoveLayer(map, "unclustered-point");
    }
  }, [useCluster, map]);

  useEffect(() => {
    if (!map) return;

    if (useHeatmap) {
      map.addLayer(heatmap, "waterway-label");
      map.addLayer(heatmapPoint, "waterway-label");
    } else {
      safeRemoveLayer(map, "symptoms-heat");
      safeRemoveLayer(map, "symptoms-point");
    }
  }, [useHeatmap, map]);

  return (
    <>
      <div style={mapContainerStyle} ref={(el) => (ref = el)} />
    </>
  );
};

export default Map;
