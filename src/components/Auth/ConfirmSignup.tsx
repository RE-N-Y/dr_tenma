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
import { Button } from "@material-ui/core";
import { MessageStore, MessageActionType } from "../../contexts/messageContext";

const ConfirmSignup: React.FC = () => {
  const authContext = useContext(AuthStore);
  const messageContext = useContext(MessageStore);

  const handleSubmit = async (values: any) => {
    try {
      let email = authContext.state.signupInput?.email as string;
      let password = authContext.state.signupInput?.password as string;

      await Auth.confirmSignUp(email, values.confirmationCode);
      await Auth.signIn(email, password);

      const { username } = await Auth.currentUserInfo();

      await API.graphql(
        graphqlOperation(mutations.createPatient, {
          input: { id: username, email: email },
        })
      );

      authContext.dispatch({
        type: AuthActionType.setAuthState,
        payload: AuthState.SignedIn,
      });

      authContext.dispatch({
        type: AuthActionType.setSignupInput,
        payload: undefined,
      });
    } catch (error) {
      messageContext.dispatch({
        type: MessageActionType.setMessage,
        payload: error.message,
      });
    }
  };

  const validationSchema = yup.object({
    confirmationCode: yup
      .string()
      .required("Please enter your confirmation code"),
  });

  return (
    <Formik
      initialValues={{
        confirmationCode: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field
            name="confirmationCode"
            label="Confirmation Code"
            color="secondary"
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
