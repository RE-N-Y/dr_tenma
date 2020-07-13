import React, { useContext } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { lightStyle } from "./mapStyles";
import { GeoStore } from "../../../contexts/geoContext";

const Map: React.FC = () => {
  const { state } = useContext(GeoStore);

  const mapContainerStyle = {
    height: "100vh",
    width: "100%",
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
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
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
