import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import { GeoStore, GeoActionType } from "../contexts/geoContext";

const Geolocator: React.FC = () => {
  const { dispatch } = useContext(GeoStore);

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch({
            type: GeoActionType.setLocation,
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation not available");
    }
  };

  return <Button onClick={getLocation}>Get Location</Button>;
};

export default Geolocator;
