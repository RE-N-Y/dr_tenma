import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import { Button, Typography } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import * as yup from "yup";
import { Auth } from "aws-amplify";
import { MessageStore, MessageActionType } from "../../contexts/messageContext";

const ConfirmNewPassword: React.FC = () => {
  const { dispatch } = useContext(MessageStore);

  const handleSubmit = async (values: any) => {
    try {
      await Auth.forgotPasswordSubmit(
        values.email,
        values.confirmationCode,
        values.newPassword
      );
    } catch (error) {
      dispatch({ type: MessageActionType.setMessage, payload: error.message });
    }
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Please enter your email")
      .email()
      .trim()
      .lowercase(),
    confirmationCode: yup.string().required("Please enter confirmation code"),
    newPassword: yup
      .string()
      .required("Please enter your new password")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), undefined], "Passwords don't match")
      .required("Please re-enter your password"),
  });

  return (
    <>
      <Typography component="h1" variant="h6">
        Confirm New Password
      </Typography>
      <Typography variant="caption">
        A confirmation code has been sent to your email, please enter the code
        to reset your password
      </Typography>
      <Formik
        initialValues={{
          email: "",
          confirmationCode: "",
          newPassword: "",
          confirmNewPassword: "",
        }}
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
            <Field
              name="confirmationCode"
              fullWidth
              label="Confirmation Code"
              component={TextField}
            />
            <Field
              name="newPassword"
              fullWidth
              label="New Password"
              component={TextField}
            />
            <Field
              name="confirmNewPassword"
              fullWidth
              label="Confirm New Password"
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

export default ConfirmNewPassword;
