import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import * as yup from "yup";
import { AuthContext, AuthState } from "../../contexts";
import { Button, Divider, Link } from "@material-ui/core";

const SignIn: React.FC = () => {
  const { setAuthState, setUser } = useContext(AuthContext);

  const handleSubmit = async (values: any) => {
    setAuthState(AuthState.SignedIn);
  };

  const validationSchema = yup.object({
    email: yup.string().email().required("Please enter your email"),
    password: yup.string().required("Please enter your password"),
  });

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
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
            <Button type="submit" disabled={isSubmitting}>
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <Divider />
      <Link
        href="#"
        onClick={() => {
          setAuthState(AuthState.SignUp);
        }}
      >
        Sign Up
      </Link>
      <Link
        href="#"
        onClick={() => {
          setAuthState(AuthState.ResetPassword);
        }}
      >
        Forgot Password?
      </Link>
    </>
  );
};

export default SignIn;
