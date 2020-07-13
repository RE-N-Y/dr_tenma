import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import * as yup from "yup";
import {
  AuthStore,
  AuthState,
  AuthActionType,
} from "../../contexts/authContext";

import { Auth, API, graphqlOperation } from "aws-amplify";
import * as mutations from "./../../graphql/mutations";
import { Button, Link } from "@material-ui/core";

const ConfirmSignup: React.FC = () => {
  const { state, dispatch } = useContext(AuthStore);

  const handleSubmit = async (values: any) => {
    try {
      await Auth.confirmSignUp(values.email, values.confirmationCode);
      await Auth.signIn(values.email, values.password);

      const { username } = await Auth.currentUserInfo();

      await API.graphql(
        graphqlOperation(mutations.createPatient, {
          input: { id: username, email: values.email },
        })
      );

      dispatch({
        type: AuthActionType.setAuthState,
        payload: AuthState.SignedIn,
      });

      dispatch({
        type: AuthActionType.setSignupInput,
        payload: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = yup.object({
    email: yup.string().email().required("Please enter your signup email"),
    password: yup.string().required("Please enter your password"),
    confirmationCode: yup
      .string()
      .required("Please enter your confirmation code"),
  });

  return (
    <Formik
      initialValues={{
        email: state.signupInput?.email,
        confirmationCode: "",
        password: state.signupInput?.password,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field
            name="email"
            label="Email"
            fullWidth
            disabled
            component={TextField}
          />
          <Field
            name="password"
            type="password"
            label="Password"
            fullWidth
            disabled
            component={TextField}
          />
          <Field
            name="confirmationCode"
            label="Confirmation Code"
            fullWidth
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
