import React from "react";
import { Container } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Appbar from "./../Appbar";
import SymptomForm from "./SymptomForm";
import Geolocator from "../Geolocator";
import Map from "./Map/Map";
import { GeoProvider } from "../../contexts/geoContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  })
);

const Dashboard = () => {
  const classes = useStyles();

  return (
    <GeoProvider>
      <Appbar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <SymptomForm />
          <Geolocator />
          <Map />
        </Container>
      </main>
    </GeoProvider>
  );
};

export default Dashboard;
