import React from "react";
import { AmplifyAuthenticator, AmplifySignUp } from "@aws-amplify/ui-react";

const formFields = [
  {
    type: "email",
    label: "Email",
    placeholder: "john@gmail.com",
    required: true,
  },
  {
    type: "password",
    label: "Password",
    placeholder: "Password",
    required: true,
  },
];

const Authenticator: React.FC = () => {
  return (
    <AmplifyAuthenticator usernameAlias="email">
      <AmplifySignUp
        slot="sign-up"
        usernameAlias="email"
        formFields={formFields}
      />
    </AmplifyAuthenticator>
  );
};

export default Authenticator;
