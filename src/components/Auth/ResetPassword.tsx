import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import { Button, Typography } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import * as yup from "yup";
import { Auth } from "aws-amplify";
import { MessageStore, MessageActionType } from "../../contexts/messageContext";

const ResetPassword: React.FC = () => {
  const { dispatch } = useContext(MessageStore);

  const handleSubmit = async (values: any) => {
    try {
      await Auth.forgotPassword(values.email);
    } catch (error) {
      dispatch({
        type: MessageActionType.setMessage,
        payload: error.message,
      });
    }
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Please enter your email")
      .email()
      .trim()
      .lowercase(),
  });

  return (
    <>
      <Typography component="h1" variant="h6">
        Reset Password
      </Typography>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              name="email"
              fullWidth
              label="Password Reset Email"
              component={TextField}
            />
            <Button type="submit" disabled={isSubmitting}>
              Reset Password
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ResetPassword;
