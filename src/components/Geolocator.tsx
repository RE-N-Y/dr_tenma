import React, { useEffect } from "react";
import { Button } from "@material-ui/core";

const Geolocator: React.FC = () => {
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return <Button onClick={getLocation}>Get Location</Button>;
};

export default Geolocator;
