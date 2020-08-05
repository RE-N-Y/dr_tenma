import React, { useEffect, useState, useContext } from "react";
import { API, Auth, graphqlOperation } from "aws-amplify";
import * as queries from "./../../graphql/queries";
import { GeoStore, GeoActionType } from "../../contexts/geoContext";
import { Grid, Button } from "@material-ui/core";
import MapPanel from "./Map/MapPanel";

const Admin: React.FC = () => {
  const { state, dispatch } = useContext(GeoStore);
  const [patientIDs, setPatientIDs] = useState([]);

  useEffect(() => {
    let listPatients = async () => {
      let apiName = "AdminQueries";
      let path = "/listUsersInGroup";
      let myInit = {
        queryStringParameters: {
          groupname: "patient",
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `${(await Auth.currentSession())
            .getAccessToken()
            .getJwtToken()}`,
        },
      };
      let result = await API.get(apiName, path, myInit);
      const ids = result.Users.map((patient: any) => {
        return patient.Username;
      });
      setPatientIDs(ids);
    };

    listPatients();
  }, []);

  const fetchNearBySymptoms = async () => {
    try {
      const result: any = await API.graphql(
        graphqlOperation(queries.nearbySymptoms, {
          location: { lat: state.latitude, lon: state.longitude },
        })
      );
      dispatch({
        type: GeoActionType.setsymptomSeries,
        symptomSeries: result.data.nearbySymptoms.items,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid container item spacing={2}>
        <Grid item xs={8}>
          <MapPanel />
          <Button onClick={fetchNearBySymptoms}>Get Nearby cases</Button>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </>
  );
};

export default Admin;
