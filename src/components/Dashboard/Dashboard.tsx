import React, { useContext, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Appbar from "./../Appbar";
import MapPanel from "./Map/MapPanel";
import { GeoProvider } from "../../contexts/geoContext";
import SymptomForm from "./SymptomForm";
import SymptomTrend from "./data/SymptomTrend";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "./../../graphql/queries";
import { AuthStore } from "../../contexts/authContext";

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
  const { state } = useContext(AuthStore);
  const [symptomSeries, setsymptomSeries] = useState<any>([]);

  useEffect(() => {
    let fetchSymptomSeries = async (username: string) => {
      try {
        const { data }: any = await API.graphql(
          graphqlOperation(queries.getSymptomSeries, { id: username })
        );

        setsymptomSeries(data.getPatient.records.items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSymptomSeries(state.user.username);
  }, [state.user.username]);

  return (
    <GeoProvider>
      <Appbar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Grid className={classes.container} container spacing={2}>
          <Grid container item spacing={2}>
            <Grid item xs={3}>
              <SymptomTrend
                title="Fever"
                symptom="fever"
                color="#004c6d"
                data={symptomSeries}
              />
            </Grid>
            <Grid item xs={3}>
              <SymptomTrend
                title="Coughing"
                symptom="coughing"
                color="#427ba0"
                data={symptomSeries}
              />
            </Grid>
            <Grid item xs={3}>
              <SymptomTrend
                title="Breathing"
                symptom="breathing"
                color="#5b93bb"
                data={symptomSeries}
              />
            </Grid>
            <Grid item xs={3}>
              <SymptomTrend
                title="Body Temperature"
                symptom="temperature"
                color="#74add6"
                data={symptomSeries}
              />
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <MapPanel
              mapProps={{ movements: symptomSeries, useHeatmap: true }}
            />
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
