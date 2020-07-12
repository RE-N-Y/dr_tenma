import React from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { Button, Slider, Typography, Paper } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import * as yup from "yup";

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
      location: yup.object({
        longitude: yup.number(),
        latitude: yup.number(),
      }),
      createdAt: yup.string().defined().required(),
      note: yup.string(),
    })
    .defined();

  const handleSubmit = (values: any) => {};

  const SliderDefaultProps = {
    marks: [1, 2, 3, 4, 5].map((num) => ({ value: num, label: `${num}` })),
    min: 1,
    max: 5,
  };

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
          location: undefined,
          createdAt: new Date().toISOString(),
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
                onChange={(event, value) => {
                  setFieldValue("fever", value);
                }}
                value={values.fever}
                {...SliderDefaultProps}
              />
              <Typography variant="subtitle1">Coughing</Typography>
              <Slider
                name="coughing"
                onChange={(event, value) => {
                  setFieldValue("coughing", value);
                }}
                value={values.coughing}
                {...SliderDefaultProps}
              />
              <Typography variant="subtitle1">Breathing</Typography>
              <Slider
                name="breathing"
                onChange={(event, value) => {
                  setFieldValue("breathing", value);
                }}
                value={values.breathing}
                {...SliderDefaultProps}
              />
              <Typography variant="subtitle1">Sore Throat</Typography>
              <Slider
                name="soreThroat"
                onChange={(event, value) => {
                  setFieldValue("soreThroat", value);
                }}
                value={values.soreThroat}
                {...SliderDefaultProps}
              />
              <Typography variant="subtitle1">Allergy</Typography>
              <Slider
                name="allergies"
                onChange={(event, value) => {
                  setFieldValue("allergies", value);
                }}
                value={values.allergies}
                {...SliderDefaultProps}
              />
              <Typography variant="subtitle1">Aching Body</Typography>
              <Slider
                name="bodyAches"
                onChange={(event, value) => {
                  setFieldValue("bodyAches", value);
                }}
                value={values.bodyAches}
                {...SliderDefaultProps}
              />
              <Field
                name="note"
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
