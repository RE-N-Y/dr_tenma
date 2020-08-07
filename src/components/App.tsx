import React, { useContext, useEffect } from "react";
import { AuthState, AuthStore, AuthActionType } from "../contexts/authContext";
import { GeoProvider } from "../contexts/geoContext";
import { CssBaseline, Snackbar } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Authenticator from "./Auth/Authenticator";
import Dashboard from "./Dashboard/Dashboard";

import { Auth } from "aws-amplify";
import { Hub, HubCapsule } from "@aws-amplify/core";
import { MessageStore, MessageActionType } from "../contexts/messageContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
  })
);

const App: React.FC = () => {
  const authContext = useContext(AuthStore);
  const messageContext = useContext(MessageStore);

  const classes = useStyles();

  const handleClose = () => {
    messageContext.dispatch({
      type: MessageActionType.setMessage,
      payload: "",
    });
  };

  useEffect(() => {
    let initAuth = async () => {
      try {
        const user = await Auth.currentUserPoolUser();
        authContext.dispatch({ type: AuthActionType.setUser, payload: user });
        authContext.dispatch({
          type: AuthActionType.setAuthState,
          payload: AuthState.SignedIn,
        });
      } catch (error) {
        messageContext.dispatch({
          type: MessageActionType.setMessage,
          payload: error,
        });
        console.log(error);
      }
    };

    initAuth();
  }, []);

  useEffect(() => {
    let updateAuth = async (data: HubCapsule) => {
      const { event, message } = data.payload;
      console.log({ event, message });
      switch (event) {
        case "signIn":
          authContext.dispatch({
            type: AuthActionType.setAuthState,
            payload: AuthState.SignedIn,
          });
          authContext.dispatch({
            type: AuthActionType.setUser,
            payload: await Auth.currentAuthenticatedUser(),
          });
          break;
        case "signUp":
          authContext.dispatch({
            type: AuthActionType.setAuthState,
            payload: AuthState.ConfirmSignUp,
          });
          break;
        case "signOut":
          authContext.dispatch({
            type: AuthActionType.setAuthState,
            payload: AuthState.Signin,
          });
          authContext.dispatch({
            type: AuthActionType.setUser,
            payload: undefined,
          });
          break;
        case "forgotPassword":
          authContext.dispatch({
            type: AuthActionType.setAuthState,
            payload: AuthState.ConfirmResetPassword,
          });
          break;
        case "forgotPasswordSubmit":
          authContext.dispatch({
            type: AuthActionType.setAuthState,
            payload: AuthState.CompletePassword,
          });
          break;
      }
    };

    Hub.listen("auth", updateAuth);
    return () => Hub.remove("auth", updateAuth);
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      {authContext.state.authState === AuthState.SignedIn &&
      authContext.state.user ? (
        <GeoProvider>
          <Dashboard
            admin={authContext.state.user?.signInUserSession.idToken.payload[
              "cognito:groups"
            ].includes("admin")}
          />
        </GeoProvider>
      ) : (
        <Authenticator />
      )}
      <Snackbar
        open={messageContext.state.message !== ""}
        autoHideDuration={5000}
        message={messageContext.state.message}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      />
    </div>
  );
};

export default App;
