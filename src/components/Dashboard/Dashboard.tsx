import React, { useContext, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Appbar from "./../Appbar";
import MapPanel from "./Map/MapPanel";
import SymptomForm from "./SymptomForm";
import SymptomTrend from "./data/SymptomTrend";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "./../../graphql/queries";
import { AuthStore } from "../../contexts/authContext";
import { GeoStore, GeoActionType } from "../../contexts/geoContext";
import Admin from "./Admin";

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

interface AdminProps {
  admin: boolean;
}

const Dashboard: React.FC<AdminProps> = (props) => {
  const classes = useStyles();
  const authContext = useContext(AuthStore);
  const geoContext = useContext(GeoStore);

  useEffect(() => {
    let fetchSymptomSeries = async (username: string) => {
      try {
        const { data }: any = await API.graphql(
          graphqlOperation(queries.getSymptomSeries, { id: username })
        );

        geoContext.dispatch({
          type: GeoActionType.setsymptomSeries,
          symptomSeries: data.getPatient.records.items,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchSymptomSeries(authContext.state.user.username);
  }, [authContext.state.user.username]);

  const renderPatient = () => {
    return (
      <>
        <Grid container item spacing={2}>
          <Grid item xs={3}>
            <SymptomTrend
              title="Fever"
              symptom="fever"
              color="#004c6d"
              data={geoContext.state.symptomSeries}
            />
          </Grid>
          <Grid item xs={3}>
            <SymptomTrend
              title="Coughing"
              symptom="coughing"
              color="#427ba0"
              data={geoContext.state.symptomSeries}
            />
          </Grid>
          <Grid item xs={3}>
            <SymptomTrend
              title="Breathing"
              symptom="breathing"
              color="#5b93bb"
              data={geoContext.state.symptomSeries}
            />
          </Grid>
          <Grid item xs={3}>
            <SymptomTrend
              title="Body Temperature"
              symptom="temperature"
              color="#74add6"
              data={geoContext.state.symptomSeries}
            />
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <MapPanel />
        </Grid>
        <Grid item xs={4}>
          <SymptomForm />
        </Grid>
      </>
    );
  };

  return (
    <>
      <Appbar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Grid className={classes.container} container spacing={2}>
          {props.admin ? <Admin /> : renderPatient()}
        </Grid>
      </main>
    </>
  );
};

export default Dashboard;
