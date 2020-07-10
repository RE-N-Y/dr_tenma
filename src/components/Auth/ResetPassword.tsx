import React from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import * as yup from "yup";

const ResetPassword: React.FC = () => {
  const handleSubmit = (values: any) => {
    alert(JSON.stringify(values, null, 2));
  };

  const validationSchema = yup.object({
    email: yup.string().required("Please enter your email").email(),
  });

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Field
            name="email"
            label="Password Reset Email"
            component={TextField}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ResetPassword;
