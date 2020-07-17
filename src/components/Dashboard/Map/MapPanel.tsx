import React, { useState } from "react";
import {
  Box,
  FormControlLabel,
  Paper,
  Typography,
  Switch,
} from "@material-ui/core";
import Map from "./Map";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface MapProps {
  mapProps: any;
}

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

const MapPanel: React.FC<MapProps> = ({ mapProps }) => {
  const classes = useStyles();
  const [mapSetting, setMapSetting] = useState({
    useCluster: false,
    useHeatmap: false,
  });
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMapSetting({ ...mapSetting, [event.target.name]: event.target.checked });
  };

  return (
    <>
      <Box className={classes.header}>
        <Typography variant="h6" className={classes.title}>
          Your activity
        </Typography>
        <FormControlLabel
          label="Heatmap"
          control={
            <Switch
              name="useHeatmap"
              color="primary"
              checked={mapSetting.useHeatmap}
              onChange={handleToggle}
            />
          }
        />
        <FormControlLabel
          label="Cluster"
          control={
            <Switch
              name="useCluster"
              color="primary"
              checked={mapSetting.useCluster}
              onChange={handleToggle}
            />
          }
        />
      </Box>

      <Paper className={classes.mapPanel}>
        <Map {...mapProps} {...mapSetting} />
      </Paper>
    </>
  );
};

export default MapPanel;
