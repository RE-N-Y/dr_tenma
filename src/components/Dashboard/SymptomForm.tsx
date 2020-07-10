import React from "react";
import { Formik, Form, Field } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import * as yup from "yup";

const SymptomForm: React.FC = () => {
  const symptoms = [
    "fever",
    "coughing",
    "breathing",
    "soreThroat",
    "allergies",
    "bodyAches",
  ];

  const validateSymptoms = Object.fromEntries(
    symptoms.map((symptom) => [
      symptom,
      yup.bool().defined().required("Required"),
    ])
  );

  const symptomInitValues = Object.fromEntries(
    symptoms.map((symptom) => [symptom, false])
  );

  const validationSchema = yup
    .object({
      ...validateSymptoms,
      location: yup.object({
        longitude: yup.number().defined(),
        latitude: yup.number().defined(),
      }),
      createdAt: yup.string().defined(),
      note: yup.string(),
    })
    .defined();

  const handleSubmit = (values: any) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <Formik
      initialValues={{
        ...symptomInitValues,
        location: undefined,
        createdAt: new Date().toISOString(),
        note: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ submitForm, isSubmitting }) => {
        return (
          <Form>
            {symptoms.map((symptom) => {
              return (
                <Field
                  key={symptom}
                  type="checkbox"
                  name={symptom}
                  Label={{ label: symptom.toUpperCase() }}
                  component={CheckboxWithLabel}
                />
              );
            })}
            <Field
              name="note"
              label="Notes"
              multiline
              rows={4}
              component={TextField}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default SymptomForm;
