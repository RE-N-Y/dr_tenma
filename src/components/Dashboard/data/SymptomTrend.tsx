import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Typography, Paper, Divider } from "@material-ui/core";
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
  const plotData = data.map((symptom) => ({
    ...symptom,
    updatedAt: new Date(symptom.updatedAt).toLocaleDateString("en-US"),
  }));

  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <Typography variant="h6">{title}</Typography>
      <Divider />
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
          <Tooltip />
          <Line
            type="monotone"
            stroke={color}
            dataKey={symptom}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default SymptomTrend;
