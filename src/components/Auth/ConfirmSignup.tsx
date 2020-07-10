import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import * as yup from "yup";
import { AuthContext, AuthState } from "../../contexts";

const ConfirmSignup: React.FC = () => {
  const { setAuthState, setUser } = useContext(AuthContext);

  const handleSubmit = (values: any) => {
    setAuthState(AuthState.SignedIn);
  };

  const validationSchema = yup.object({
    confirmationCode: yup
      .string()
      .required("Please enter your confirmation code"),
  });

  return (
    <Formik
      initialValues={{ confirmationCode: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Field
            name="confirmationCode"
            label="Confirmation Code"
            component={TextField}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ConfirmSignup;
