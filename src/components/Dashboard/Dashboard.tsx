import React from "react";
import { Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Appbar from "./../Appbar";
import SymptomForm from "./SymptomForm";
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
      padding: theme.spacing(4, 6),
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
        <Grid className={classes.container} container spacing={3}>
          <Grid item xs={8}>
            <Map />
          </Grid>
          <Grid item xs={4}>
            <SymptomForm />
          </Grid>
        </Grid>
      </main>
    </GeoProvider>
  );
};

export default Dashboard;
