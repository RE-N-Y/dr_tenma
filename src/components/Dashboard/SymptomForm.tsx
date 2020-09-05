import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { Button, Slider, Typography, Paper } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import * as yup from "yup";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "./../../graphql/mutations";
import { GeoStore } from "../../contexts/geoContext";
import { AuthStore } from "../../contexts/authContext";
import { Severity } from "../../API";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      margin: theme.spacing(3, 0, 2),
    },
    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: theme.spacing(6),
      "& .MuiSlider-root": {
        marginBottom: theme.spacing(4),
      },
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })
);

const SymptomForm: React.FC = () => {
  const classes = useStyles();
  const geoContext = useContext(GeoStore);
  const authContext = useContext(AuthStore);

  const symptomValidtion = yup
    .number()
    .integer()
    .defined()
    .min(1)
    .max(5)
    .required("Please indicate your level of symptom");

  const validationSchema = yup
    .object({
      fever: symptomValidtion,
      coughing: symptomValidtion,
      breathing: symptomValidtion,
      soreThroat: symptomValidtion,
      allergies: symptomValidtion,
      bodyAches: symptomValidtion,
      temperature: yup
        .number()
        .min(20)
        .max(50)
        .required("Please record your body tempreature"),
      note: yup.string(),
    })
    .defined();

  const getSeverity = (values: any) => {
    return Severity.WATCH;
  };

  const handleSubmit = async (values: any, { resetForm }: any) => {
    let symptomInput = {
      ...values,
      patientID: authContext.state.user.username,
      severity: getSeverity(values),
    };

    if (geoContext.state.isLoactionOn) {
      symptomInput["location"] = {
        lon: geoContext.state.longitude,
        lat: geoContext.state.latitude,
      };
    }
    try {
      await API.graphql(
        graphqlOperation(mutations.createSymptom, { input: symptomInput })
      );

      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const SliderDefaultProps = {
    marks: [1, 2, 3, 4, 5].map((num) => ({ value: num, label: `${num}` })),
    min: 1,
    max: 5,
  };

  const temperatureMarks = [
    {
      value: 20,
      label: "20°C",
    },
    { value: 30, label: "30°C" },
    {
      value: 36,
      label: "36.5°C",
    },
    {
      value: 39,
      label: "39°C",
    },
    {
      value: 50,
      label: "50°C",
    },
  ];

  return (
    <Paper>
      <Formik
        initialValues={{
          fever: 3,
          coughing: 3,
          breathing: 3,
          soreThroat: 3,
          allergies: 3,
          bodyAches: 3,
          temperature: 36.5,
          note: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => {
          return (
            <Form className={classes.form}>
              <Typography variant="h6" className={classes.title}>
                Symptoms
              </Typography>
              <Typography variant="subtitle1">Fever</Typography>
              <Slider
                name="fever"
                color="secondary"
                onChange={(event, value) => {
                  setFieldValue("fever", value);
                }}
                value={values.fever}
                valueLabelDisplay="auto"
                {...SliderDefaultProps}
              />
              <Typography variant="subtitle1">Coughing</Typography>
              <Slider
                name="coughing"
                color="secondary"
                onChange={(event, value) => {
                  setFieldValue("coughing", value);
                }}
                value={values.coughing}
                valueLabelDisplay="auto"
                {...SliderDefaultProps}
              />
              <Typography variant="subtitle1">Breathing</Typography>
              <Slider
                name="breathing"
                color="secondary"
                onChange={(event, value) => {
                  setFieldValue("breathing", value);
                }}
                value={values.breathing}
                valueLabelDisplay="auto"
                {...SliderDefaultProps}
              />
              <Typography variant="subtitle1">Sore Throat</Typography>
              <Slider
                name="soreThroat"
                color="secondary"
                onChange={(event, value) => {
                  setFieldValue("soreThroat", value);
                }}
                value={values.soreThroat}
                valueLabelDisplay="auto"
                {...SliderDefaultProps}
              />
              <Typography variant="subtitle1">Allergy</Typography>
              <Slider
                name="allergies"
                color="secondary"
                onChange={(event, value) => {
                  setFieldValue("allergies", value);
                }}
                value={values.allergies}
                valueLabelDisplay="auto"
                {...SliderDefaultProps}
              />
              <Typography variant="subtitle1">Aching Body</Typography>
              <Slider
                name="bodyAches"
                color="secondary"
                onChange={(event, value) => {
                  setFieldValue("bodyAches", value);
                }}
                value={values.bodyAches}
                valueLabelDisplay="auto"
                {...SliderDefaultProps}
              />
              <Typography variant="subtitle1">Body Temperature</Typography>
              <Slider
                name="temperature"
                color="secondary"
                onChange={(event, value) => {
                  setFieldValue("temperature", value);
                }}
                valueLabelDisplay="auto"
                value={values.temperature}
                min={20}
                max={50}
                step={0.1}
                marks={temperatureMarks}
              />
              <Field
                name="note"
                color="secondary"
                label="Notes"
                multiline
                rows={4}
                component={TextField}
              />

              <Button
                type="submit"
                variant="contained"
                className={classes.submit}
                disabled={isSubmitting}
              >
                Submit Symptoms
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Paper>
  );
};

export default SymptomForm;
