import React, { useContext, useEffect, useState } from "react";
import { GeoStore, GeoActionType } from "../../../contexts/geoContext";
import { LocationInput } from "../../../API";
import mapboxgl from "mapbox-gl";
import { symptomsToGeoJSON, initData, initPoly } from "./mapUtils";
import {
  cluster,
  clusterCount,
  unclustered,
  heatmap,
  heatmapPoint,
  main,
  searchCircle,
  searchRadius,
} from "./mapSetting";
import * as turf from "@turf/turf";
import length from "@turf/length";
import * as _ from "lodash";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN as string;

interface MapProps {
  movements: { location: LocationInput; updatedAt: string }[];
  layer: "main" | "cluster" | "heatmap";
  searchEnabled: boolean;
  setSearch: Function;
}

const Map: React.FC<MapProps> = ({
  movements,
  layer,
  searchEnabled,
  setSearch,
}) => {
  const { dispatch } = useContext(GeoStore);
  const [map, setMap] = useState<mapboxgl.Map>();

  let ref: any;

  const mapContainerStyle = {
    height: "100%",
    width: "100%",
  };

  useEffect(() => {
    let map = new mapboxgl.Map({
      container: ref,
      style: "mapbox://styles/mapbox/light-v10",
      center: [139.7745, 35.7023],
      zoom: 10,
    });
    setMap(undefined);

    let canvas = map.getCanvas();
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

    const setPoint = (
      lngLat: number[],
      index: number,
      visibility: "visible" | "invisible"
    ) => {
      let searchSource = map.getSource("search-point") as any;
      let newSearchPoint = _.cloneDeep(searchSource._data);
      newSearchPoint.features[index] = {
        type: "Feature",
        properties: { visibility },
        geometry: { type: "Point", coordinates: lngLat },
      };

      searchSource.setData(newSearchPoint);
    };

    const clearPoint = () => {
      let searchSource = map.getSource("search-point") as any;
      searchSource.setData(initData);
    };

    const onMove = (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
      setPoint(e.lngLat.toArray(), 1, "invisible");
      let searchSource = map.getSource("search-point") as any;
      let searchCircle = map.getSource("search-circle") as any;
      const center = searchSource._data.features[0].geometry.coordinates;
      const line = turf.lineString([center, e.lngLat.toArray()]);
      try {
        searchCircle.setData(turf.circle(center, length(line)));
      } catch (error) {
        console.log("circle init failed");
      }
    };

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
      map.addSource("search-point", {
        type: "geojson",
        data: initData,
      });
      map.addSource("search-circle", initPoly);

      map.addLayer(main);
      map.addLayer(cluster);
      map.addLayer(clusterCount);
      map.addLayer(unclustered);
      map.addLayer(heatmap, "waterway-label");
      map.addLayer(heatmapPoint, "waterway-label");
      map.addLayer(searchCircle);
      map.addLayer(searchRadius);

      map.on("mousedown", (e) => {
        if (
          map.getLayoutProperty("search-circle", "visibility") === "visible"
        ) {
          e.preventDefault();

          clearPoint();
          setPoint(e.lngLat.toArray(), 0, "visible");
        }
      });

      map.on("mouseenter", "search-circle", (e) => {
        canvas.style.cursor = "move";
      });

      map.on("mousedown", "search-circle", (e) => {
        map.on("mousemove", onMove);
        map.once("mouseup", () => {
          map.off("mousemove", onMove);
        });
      });

      map.on("mouseleave", "search-circle", () => {
        let searchSource = map.getSource("search-point") as any;
        canvas.style.cursor = "";
        if (searchSource._data.features.length === 2) {
          const center = searchSource._data.features[0].geometry.coordinates;
          const edge = searchSource._data.features[1].geometry.coordinates;
          const line = turf.lineString([center, edge]);

          setSearch({ lat: center[1], lon: center[0], radius: length(line) });
        }
      });

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

  useEffect(() => {
    if (!map) return;

    const visibility = searchEnabled ? "visible" : "none";
    map.setLayoutProperty("search-circle", "visibility", visibility);
    map.setLayoutProperty("search-radius", "visibility", visibility);
  }, [map, searchEnabled]);

  return (
    <>
      <div style={mapContainerStyle} ref={(el) => (ref = el)} />
    </>
  );
};

export default Map;
