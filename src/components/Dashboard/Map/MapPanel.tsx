import React, { useState } from "react";
import {
  Box,
  FormControlLabel,
  Paper,
  Typography,
  Select,
  MenuItem,
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

  const [layer, setLayer] = useState("main");
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLayer(event.target.value as string);
  };

  return (
    <>
      <Box className={classes.header}>
        <Typography variant="h6" className={classes.title}>
          Your activity
        </Typography>
        <Select value={layer} onChange={handleChange}>
          <MenuItem value="main">Main</MenuItem>
          <MenuItem value="heatmap">Heatmap</MenuItem>
          <MenuItem value="cluster">Cluster</MenuItem>
        </Select>
      </Box>

      <Paper className={classes.mapPanel}>
        <Map {...mapProps} layer={layer} />
      </Paper>
    </>
  );
};

export default MapPanel;
