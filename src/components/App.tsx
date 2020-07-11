import React, { useContext, useEffect } from "react";
import { AuthState, AuthStore, AuthActionType } from "../contexts/authContext";
import { CssBaseline } from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  createMuiTheme,
  Theme,
} from "@material-ui/core/styles";
import { indigo, yellow } from "@material-ui/core/colors";
import Authenticator from "./Auth/Authenticator";
import Dashboard from "./Dashboard/Dashboard";

import { Auth } from "aws-amplify";
import { Hub, HubCapsule } from "@aws-amplify/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
  })
);

const App: React.FC = () => {
  const { state, dispatch } = useContext(AuthStore);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: indigo[900],
      },
      secondary: {
        main: yellow[400],
      },
    },
  });

  const classes = useStyles();

  useEffect(() => {
    let initAuth = async () => {
      try {
        const user = await Auth.currentUserPoolUser();
        dispatch({ type: AuthActionType.setUser, payload: user });
        dispatch({
          type: AuthActionType.setAuthState,
          payload: AuthState.SignedIn,
        });
      } catch (error) {
        console.log(error);
      }
    };

    initAuth();
  }, [dispatch]);

  useEffect(() => {
    let updateAuth = async (data: HubCapsule) => {
      const { event, message } = data.payload;
      console.log({ event, message });
      switch (event) {
        case "signIn":
          dispatch({
            type: AuthActionType.setAuthState,
            payload: AuthState.SignedIn,
          });
          dispatch({
            type: AuthActionType.setUser,
            payload: await Auth.currentAuthenticatedUser(),
          });
          break;
        case "signUp":
          dispatch({
            type: AuthActionType.setAuthState,
            payload: AuthState.ConfirmSignUp,
          });
          break;
        case "signOut":
          dispatch({
            type: AuthActionType.setAuthState,
            payload: AuthState.Signin,
          });
          dispatch({ type: AuthActionType.setUser, payload: undefined });
          break;
        case "forgotPassword":
          dispatch({
            type: AuthActionType.setAuthState,
            payload: AuthState.ConfirmResetPassword,
          });
          break;
        case "forgotPasswordSubmit":
          dispatch({
            type: AuthActionType.setAuthState,
            payload: AuthState.CompletePassword,
          });
          break;
      }
    };

    Hub.listen("auth", updateAuth);
    return () => Hub.remove("auth", updateAuth);
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      {state.authState === AuthState.SignedIn && state.user ? (
        <Dashboard />
      ) : (
        <Authenticator />
      )}
    </div>
  );
};

export default App;
