import React, { useContext } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  MarkerClusterer,
  HeatmapLayer,
} from "@react-google-maps/api";
import { lightStyle } from "./mapStyles";
import { GeoStore } from "../../../contexts/geoContext";
import { LocationInput } from "../../../API";

interface MapProps {
  movements: { location: LocationInput; updatedAt: string }[];
  useHeatmap: boolean;
  useCluster: boolean;
}

const libs = ["visualization"];

const Map: React.FC<MapProps> = ({ movements, useCluster, useHeatmap }) => {
  const { state } = useContext(GeoStore);
  let global: any = window;

  const mapContainerStyle = {
    height: "100%",
    width: "100%",
    borderRadius: 20,
  };

  let filteredMoves = movements.filter((movement) => movement.location);

  const locations = filteredMoves.map((movement) => ({
    lat: movement.location.lat,
    lng: movement.location.lon,
  }));

  const heatmapLocations = filteredMoves.map((movement) => {
    return new global.google.maps.LatLng(
      movement.location.lat,
      movement.location.lon
    );
  });

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
      libraries={libs}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={{
          lat: state.latitude,
          lng: state.longitude,
        }}
        options={{ styles: lightStyle }}
      >
        <Marker
          position={{
            lat: state.latitude,
            lng: state.longitude,
          }}
        />
        {useCluster && (
          <MarkerClusterer>
            {(clusterer) =>
              locations.map((location, index) => (
                <Marker key={index} position={location} clusterer={clusterer} />
              ))
            }
          </MarkerClusterer>
        )}
        {useHeatmap && <HeatmapLayer data={heatmapLocations} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
