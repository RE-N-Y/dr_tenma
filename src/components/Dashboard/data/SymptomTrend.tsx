import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Box, Typography, Paper, Divider } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface SymptomTrendProps {
  title: string;
  color: string;
  symptom: string;
  data: { updatedAt: string }[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(2),
    },
  })
);

const SymptomTrend: React.FC<SymptomTrendProps> = ({
  title,
  color,
  symptom,
  data,
}) => {
  const classes = useStyles();

  const plotData = data.map((symptom) => ({
    ...symptom,
    updatedAt: new Date(symptom.updatedAt).toLocaleDateString("en-US"),
  }));

  const tooltip = (tooltipProps:any) => {
    if(tooltipProps.payload.length > 0) {
      const data = tooltipProps.payload[0];

      return (
        <Paper>
          <Box p={2}>
            <Typography>{data.payload[data.dataKey]}</Typography>
            <Typography variant="caption">{tooltipProps.label}</Typography>
          </Box>
        </Paper>
      );
    } else {
      return null;
    }
    
  }

  return (
    <Paper className={classes.container}>
      <Typography variant="h6">{title}</Typography>
      <Divider />
      {plotData.length > 0 ? (
        <ResponsiveContainer height={250}>
          <LineChart data={plotData}>
            <XAxis
              dataKey="updatedAt"
              domain={["auto", "auto"]}
              padding={{ left: 20, right: 20 }}
              name="Time"
              minTickGap={10}
            />
            <YAxis
              domain={["auto", "auto"]}
              padding={{ top: 20, bottom: 20 }}
              hide
            />
            <Tooltip content={tooltip}/>
            <Line
              type="monotone"
              stroke={color}
              dataKey={symptom}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Typography>No data to display</Typography>
      )}
    </Paper>
  );
};

export default SymptomTrend;
