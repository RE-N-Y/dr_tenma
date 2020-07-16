import React from "react";
import { Paper } from "@material-ui/core";
import Map from "./Map";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface MapProps {
  mapProps: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mapPanel: {
      padding: theme.spacing(2),
      height: 600,
    },
  })
);

const MapPanel: React.FC<MapProps> = ({ mapProps }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.mapPanel}>
      <Map {...mapProps} />
    </Paper>
  );
};

export default MapPanel;
