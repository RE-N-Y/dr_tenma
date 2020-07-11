import React, { useState } from "react";
import { AuthState, AuthContext } from "../contexts";
import { CssBaseline, Grid, ThemeProvider } from "@material-ui/core";
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "100vh",
    },
  })
);

const App: React.FC = () => {
  const [user, setUser] = useState<any | undefined>(undefined);
  const [authState, setAuthState] = useState<AuthState>(AuthState.Signin);

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

  return (
    <AuthContext.Provider value={{ user, authState, setUser, setAuthState }}>
      <ThemeProvider theme={theme}>
        <Grid
          container
          className={classes.root}
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
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
