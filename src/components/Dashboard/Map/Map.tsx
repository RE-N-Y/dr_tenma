import React, { useContext, useEffect, useState } from "react";
import { GeoStore, GeoActionType } from "../../../contexts/geoContext";
import { LocationInput } from "../../../API";
import mapboxgl from "mapbox-gl";
import { symptomsToGeoJSON, safeRemoveLayer } from "./mapUtils";
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
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

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
    setIsLoaded(false);

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
      setIsLoaded(true);
    });

    map.on("dragstart", (event) => {
      console.log(event);
    });

    map.on("dragend", (event) => {
      console.log(event);
    });

    setMap(map);
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

    map?.addSource("symptoms", {
      type: "geojson",
      data,
    });
    map?.addSource("symptoms-cluster", {
      type: "geojson",
      data,
      cluster: true,
    });
  }, [movements]);

  useEffect(() => {
    if (!isLoaded) return;

    if (useCluster) {
      map?.addLayer(cluster);
      map?.addLayer(clusterCount);
      map?.addLayer(unclustered);
    } else {
      safeRemoveLayer(map, "clusters");
      safeRemoveLayer(map, "cluster-count");
      safeRemoveLayer(map, "unclustered-point");
    }
  }, [useCluster, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    if (useHeatmap) {
      map?.addLayer(heatmap, "waterway-label");
      map?.addLayer(heatmapPoint, "waterway-label");
    } else {
      safeRemoveLayer(map, "symptoms-heat");
      safeRemoveLayer(map, "symptoms-point");
    }
  }, [useHeatmap, isLoaded]);

  return (
    <>
      <div style={mapContainerStyle} ref={(el) => (ref = el)} />
    </>
  );
};

export default Map;
