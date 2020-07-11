import React, { useContext, useEffect } from "react";
import { AuthState, AuthContext } from "../../contexts";
import Signin from "./Signin";
import ConfirmSignup from "./ConfirmSignup";
import Signup from "./Signup";
import ResetPassword from "./ResetPassword";
import ConfirmNewPassword from "./ConfirmNewPassword";
import { LinearProgress, Paper } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TrackChanges } from "@material-ui/icons";

import { Auth } from "@aws-amplify/auth";
import { Hub, HubCapsule } from "@aws-amplify/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: 800,
      padding: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
      },
      "& .MuiButton-root": {
        margin: theme.spacing(3, 0, 2),
      },
    },
    logo: {
      margin: theme.spacing(1),
    },
  })
);

const Authenticator: React.FC = () => {
  const { authState, setAuthState, setUser } = useContext(AuthContext);
  const classes = useStyles();

  useEffect(() => {
    let updateAuth = async (data: HubCapsule) => {
      const { event, message } = data.payload;
      switch (event) {
        case "signIn":
          setAuthState(AuthState.SignedIn);
          setUser(await Auth.currentAuthenticatedUser());
          break;
        case "signUp":
          setAuthState(AuthState.ConfirmSignUp);
          break;
        case "signOut":
          setAuthState(AuthState.Signin);
          setUser(undefined);
          break;
        case "forgotPassword":
          setAuthState(AuthState.ConfirmResetPassword);
          break;
        case "forgotPasswordSubmit":
          setAuthState(AuthState.Signin);
          break;
      }
      console.log({ event, message });
    };

    Hub.listen("auth", updateAuth);
    return () => Hub.remove("auth", updateAuth);
  });

  const renderForm = () => {
    switch (authState) {
      case AuthState.Signin:
        return <Signin />;
      case AuthState.SignUp:
        return <Signup />;
      case AuthState.ConfirmSignUp:
        return <ConfirmSignup />;
      case AuthState.ResetPassword:
        return <ResetPassword />;
      case AuthState.ConfirmResetPassword:
        return <ConfirmNewPassword />;
      default:
        return <LinearProgress />;
    }
  };

  return (
    <Paper className={classes.paper}>
      <TrackChanges fontSize="large" className={classes.logo} />
      {renderForm()}
    </Paper>
  );
};

export default Authenticator;
