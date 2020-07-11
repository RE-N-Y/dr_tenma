import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import * as yup from "yup";
import {
  AuthStore,
  AuthState,
  AuthActionType,
} from "../../contexts/authContext";
import { Box, Button, Divider, Link, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { Auth } from "aws-amplify";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      padding: theme.spacing(1),
    },
  })
);

const Signin: React.FC = () => {
  const { state, dispatch } = useContext(AuthStore);
  const classes = useStyles();

  const handleSubmit = async (values: any) => {
    try {
      const user = await Auth.signIn(values.email, values.password);
      dispatch({ type: AuthActionType.setUser, payload: user });

      if (state.authState === AuthState.CompletePassword) {
        await Auth.completeNewPassword(user, values.password, {
          email: values.email,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email()
      .required("Please enter your email")
      .trim()
      .lowercase(),
    password: yup.string().required("Please enter your password"),
  });

  return (
    <>
      <Typography component="h1" variant="h6">
        Login
      </Typography>
      <Box>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="email"
                label="Email"
                fullWidth
                component={TextField}
              />
              <Field
                name="password"
                type="password"
                label="Password"
                fullWidth
                component={TextField}
              />
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <Divider />
        <Box className={classes.footer}>
          <Link
            href="#"
            onClick={() => {
              dispatch({
                type: AuthActionType.setAuthState,
                payload: AuthState.SignUp,
              });
            }}
          >
            Sign Up
          </Link>
          <Link
            href="#"
            onClick={() => {
              dispatch({
                type: AuthActionType.setAuthState,
                payload: AuthState.ResetPassword,
              });
            }}
          >
            Forgot Password?
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Signin;
