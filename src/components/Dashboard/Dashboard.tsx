import React, { useContext } from "react";
import { AuthContext } from "../../contexts";
import { Box } from "@material-ui/core";
import Appbar from "./../Appbar";
import SymptomForm from "./SymptomForm";
import Geolocator from "../Geolocator";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <Box display="flex">
      <Appbar />
      <SymptomForm />
      <Geolocator />
    </Box>
  );
};

export default Dashboard;
