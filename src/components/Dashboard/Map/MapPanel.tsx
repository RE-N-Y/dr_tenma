import React, { useState, useContext } from "react";
import {
  Box,
  Paper,
  Typography,
  Select,
  MenuItem,
  Button,
  Switch,
} from "@material-ui/core";
import Map from "./Map";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "./../../../graphql/queries";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { GeoStore, GeoActionType } from "../../../contexts/geoContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: "flex",
      padding: theme.spacing(1),
    },
    title: { flexGrow: 1 },

    mapPanel: {
      padding: theme.spacing(2),
      height: 600,
    },
  })
);

const MapPanel: React.FC = () => {
  type LayerOptions = "main" | "cluster" | "heatmap";
  interface SearchParams {
    lat: number;
    lon: number;
    radius: number;
  }

  const classes = useStyles();
  const { state } = useContext(GeoStore);

  const [layer, setLayer] = useState<LayerOptions>("main");
  const [search, setSearch] = useState<SearchParams>();
  const [searchEnabled, setSearchEnabled] = useState<boolean>(true);

  const { dispatch } = useContext(GeoStore);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLayer(event.target.value as LayerOptions);
  };

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchEnabled(!searchEnabled);
  };

  const searchSymptomsInRadius = async () => {
    if (!search) return;

    try {
      const result: any = await API.graphql(
        graphqlOperation(queries.nearbySymptoms, {
          location: { lat: search.lat, lon: search.lon },
          m: Math.round(search.radius * 1000),
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
      <Box className={classes.header}>
        <Typography variant="h6" className={classes.title}>
          Activities
        </Typography>
        {searchEnabled && (
          <Button onClick={searchSymptomsInRadius}>Scan Activities</Button>
        )}
        <Switch checked={searchEnabled} onChange={handleToggle} />
        <Select value={layer} onChange={handleChange}>
          <MenuItem value="main">Main</MenuItem>
          <MenuItem value="heatmap">Heatmap</MenuItem>
          <MenuItem value="cluster">Cluster</MenuItem>
        </Select>
      </Box>

      <Paper className={classes.mapPanel}>
        <Map
          movements={state.symptomSeries}
          layer={layer}
          searchEnabled={searchEnabled}
          setSearch={setSearch}
        />
      </Paper>
    </>
  );
};

export default MapPanel;
