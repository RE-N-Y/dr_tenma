import React, { useState, useEffect } from "react";
import { AuthState, AuthContext } from "../contexts";
import { Hub } from "@aws-amplify/core";
import { CssBaseline, Grid, ThemeProvider } from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  Theme,
  createMuiTheme,
} from "@material-ui/core/styles";
import { indigo, yellow } from "@material-ui/core/colors";
import Authenticator from "./Auth/Authenticator";
import Dashboard from "./Dashboard/Dashboard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
    },
  })
);

const App: React.FC = () => {
  const [user, setUser] = useState<any | undefined>(undefined);
  const [authState, setAuthState] = useState<AuthState>(AuthState.SignIn);
  const classes = useStyles();

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

  useEffect(() => {
    let updateAuth = (data: any) => {
      console.log(data);
    };

    Hub.listen("auth", updateAuth);
    return () => Hub.remove("auth", updateAuth);
  });

  return (
    <AuthContext.Provider value={{ user, authState, setUser, setAuthState }}>
      <ThemeProvider theme={theme}>
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          {authState === AuthState.SignedIn && user ? (
            <Dashboard />
          ) : (
            <Authenticator />
          )}
        </Grid>
      </ThemeProvider>
    </AuthContext.Provider>
  );
};

export default App;
