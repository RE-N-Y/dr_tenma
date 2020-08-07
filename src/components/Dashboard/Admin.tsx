import React, { useEffect, useState, useContext } from "react";
import { API, Auth, graphqlOperation } from "aws-amplify";
import * as queries from "./../../graphql/queries";
import { GeoStore, GeoActionType } from "../../contexts/geoContext";
import { Grid, Button, Typography } from "@material-ui/core";
import MapPanel from "./Map/MapPanel";
import PatientInfo from "./PatientInfo";

const Admin: React.FC = () => {
  const geoContext = useContext(GeoStore);
  const [patients, setPatients] = useState<any[]>([]);

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
      const patientInfo = result.Users.map((patient: any) => {
        return {
          username: patient.Username,
          email: patient.Attributes[2].Value,
        };
      });
      setPatients(patientInfo);
    };

    listPatients();
  }, []);

  const fetchNearBySymptoms = async () => {
    try {
      const result: any = await API.graphql(
        graphqlOperation(queries.nearbySymptoms, {
          location: {
            lat: geoContext.state.latitude,
            lon: geoContext.state.longitude,
          },
        })
      );
      geoContext.dispatch({
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
        <Grid item xs={7}>
          <MapPanel />
          <Button onClick={fetchNearBySymptoms}>Get Nearby cases</Button>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h6">Your Patients</Typography>
          {patients.map(({ username, email }) => {
            return (
              <PatientInfo key={email} username={username} email={email} />
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default Admin;
