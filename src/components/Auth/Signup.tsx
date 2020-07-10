import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import * as yup from "yup";
import { AuthContext, AuthState } from "../../contexts";

const Signup: React.FC = () => {
  const { setAuthState, setUser } = useContext(AuthContext);

  const handleSubmit = (values: any) => {
    setAuthState(AuthState.ConfirmSignUp);
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
    <Formik
      initialValues={{ email: "", password: "", passwordConfirmation: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ submitForm, isSubmitting }) => (
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
        </Form>
      )}
    </Formik>
  );
};

export default Signup;
