import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { Button, Typography } from "@material-ui/core";
import * as yup from "yup";
import { Auth } from "aws-amplify";
import { AuthStore, AuthActionType } from "../../contexts/authContext";

const Signup: React.FC = () => {
  const { dispatch } = useContext(AuthStore);

  const handleSubmit = async (values: any) => {
    try {
      await Auth.signUp({
        username: values.email,
        password: values.password,
        attributes: {
          email: values.email,
        },
      });
      dispatch({
        type: AuthActionType.setSignupInput,
        payload: { email: values.email, password: values.password },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = yup.object({
    email: yup.string().email().required("Please enter your email"),
    password: yup
      .string()
      .required("Please enter your password")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "Password don't match")
      .required("Please re-enter your password"),
  });

  return (
    <>
      <Typography component="h1" variant="h6">
        Sign Up
      </Typography>
      <Formik
        initialValues={{ email: "", password: "", passwordConfirmation: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="email" label="Email" fullWidth component={TextField} />
            <Field
              name="password"
              type="password"
              label="Password"
              fullWidth
              component={TextField}
            />
            <Field
              name="passwordConfirmation"
              type="password"
              label="Confirm Password"
              fullWidth
              component={TextField}
            />
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Signup;
