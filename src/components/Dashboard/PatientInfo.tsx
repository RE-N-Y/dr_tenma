import React, { useState, useContext } from "react";
import * as queries from "./../../graphql/queries";
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  IconButton,
  Collapse,
  Typography,
  LinearProgress,
  makeStyles,
  createStyles,
  Theme,
  Button,
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Chip,
  Box,
} from "@material-ui/core";
import { API, graphqlOperation } from "aws-amplify";
import { ExpandLess, ExpandMore, PriorityHighSharp } from "@material-ui/icons";
import { GeoStore, GeoActionType } from "../../contexts/geoContext";

interface PatientInfoProps {
  username: string;
  email: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      marginBottom: theme.spacing(1),
    },
    chip: {
      margin: theme.spacing(1),
    },
  })
);

const PatientInfo: React.FC<PatientInfoProps> = ({ username, email }) => {
  const [patient, setPatient] = useState<any>();
  const [expanded, setExpanded] = useState(false);
  const geoContext = useContext(GeoStore);
  const classes = useStyles();

  const fetchUser = async () => {
    try {
      const { data }: any = await API.graphql(
        graphqlOperation(queries.getPatient, { id: username })
      );
      setPatient(data.getPatient);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleInfo = () => {
    if (!patient) {
      fetchUser();
    }
    setExpanded(!expanded);
    console.log(patient);
  };

  const displaySymptoms = () => {
    geoContext.dispatch({
      type: GeoActionType.setsymptomSeries,
      symptomSeries: patient.records.items,
    });
  };

  const columns = ["fever", "breathing", "coughing", "temperature"];
  const danger = [3, 3, 3, 38];

  const renderStatus = (
    symptoms: string[],
    values: number[],
    danger: number[]
  ) => {
    return (
      <>
        {symptoms.map((symptom, index) => {
          return (
            values[index] > danger[index] && (
              <Chip
                key={index}
                className={classes.chip}
                color={"secondary"}
                icon={<PriorityHighSharp />}
                label={symptom.toUpperCase()}
              />
            )
          );
        })}
      </>
    );
  };

  const getSeriesAvg = (items: any[], column: string): number => {
    const filteredItems = items.map((item) => item[column]);
    const avg: number =
      filteredItems.reduce((prev, curr) => prev + curr) / filteredItems.length;
    return avg;
  };

  const getAvgArray = (items: any[], columns: string[]) => {
    const avgArray = columns.map((column) => getSeriesAvg(items, column));
    return avgArray;
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar>{email[0].toUpperCase()}</Avatar>}
        title={email}
        action={
          <IconButton onClick={toggleInfo}>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {patient ? (
          <>
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="subtitle1">{`Email: ${email}`}</Typography>
                  <Typography variant="subtitle1">{`Registered Symptoms: ${patient.records.items.length}`}</Typography>
                </Box>
                <Box>
                  {renderStatus(
                    columns,
                    getAvgArray(patient.records.items, columns),
                    danger
                  )}
                </Box>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Symptoms</TableCell>
                      {columns.map((column) => (
                        <TableCell key={column} align="right">
                          {column.toUpperCase()}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Global
                      </TableCell>
                      {columns.map((column) => (
                        <TableCell key={column} align="right">
                          {getSeriesAvg(
                            patient.records.items,
                            column
                          ).toPrecision(2)}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Recent
                      </TableCell>
                      {columns.map((column) => (
                        <TableCell key={column} align="right">
                          {getSeriesAvg(
                            patient.records.items.slice(-4, -1),
                            column
                          ).toPrecision(2)}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Button onClick={displaySymptoms}>Display symptoms</Button>
            </CardContent>
          </>
        ) : (
          <LinearProgress />
        )}
      </Collapse>
    </Card>
  );
};

export default PatientInfo;
