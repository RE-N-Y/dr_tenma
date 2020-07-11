import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import * as yup from "yup";
import {
  AuthStore,
  AuthState,
  AuthActionType,
} from "../../contexts/authContext";

import { Auth } from "aws-amplify";
import { Button } from "@material-ui/core";

const ConfirmSignup: React.FC = () => {
  const { dispatch } = useContext(AuthStore);

  const handleSubmit = async (values: any) => {
    try {
      await Auth.confirmSignUp(values.email, values.confirmationCode);
      dispatch({
        type: AuthActionType.setAuthState,
        payload: AuthState.Signin,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = yup.object({
    email: yup.string().email().required("Please enter your signup email"),
    confirmationCode: yup
      .string()
      .required("Please enter your confirmation code"),
  });

  return (
    <Formik
      initialValues={{ email: "", confirmationCode: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field name="email" label="Email" component={TextField} />
          <Field
            name="confirmationCode"
            label="Confirmation Code"
            component={TextField}
          />
          <Button type="submit" disabled={isSubmitting}>
            Verify Account
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ConfirmSignup;
