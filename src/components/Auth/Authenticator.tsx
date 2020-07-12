import React, { useContext } from "react";
import { AuthState, AuthStore } from "../../contexts/authContext";
import Signin from "./Signin";
import ConfirmSignup from "./ConfirmSignup";
import Signup from "./Signup";
import ResetPassword from "./ResetPassword";
import ConfirmNewPassword from "./ConfirmNewPassword";
import { Grid, LinearProgress, Paper } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TrackChanges } from "@material-ui/icons";

const unsplashURL = "https://source.unsplash.com/collection/9717149/1600x900";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    authWrapper: {
      minHeight: "100vh",
      backgroundImage: `url(${unsplashURL})`,
      backgroundBlendMode: "luminosity",
      boxShadow: "inset 0 0 0 100vw rgba(0,0,0,0.5)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
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
  const { state } = useContext(AuthStore);
  const classes = useStyles();

  const renderForm = () => {
    switch (state.authState) {
      case AuthState.Signin:
      case AuthState.CompletePassword:
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
    <Grid
      container
      className={classes.authWrapper}
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Paper className={classes.paper}>
        <TrackChanges fontSize="large" className={classes.logo} />
        {renderForm()}
      </Paper>
    </Grid>
  );
};

export default Authenticator;
