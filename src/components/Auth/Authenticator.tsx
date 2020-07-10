import React, { useContext } from "react";
import { AuthState, AuthContext } from "../../contexts";
import SignIn from "./SignIn";
import ConfirmSignup from "./ConfirmSignup";
import Signup from "./Signup";
import ResetPassword from "./ResetPassword";
import { LinearProgress, Grid, Paper } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TrackChanges } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      backgroundImage: "url(https://source.unsplash.com/collection/9717149)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  })
);

const Authenticator: React.FC = () => {
  const { authState } = useContext(AuthContext);
  const classes = useStyles();
  const renderForm = () => {
    switch (authState) {
      case AuthState.SignIn:
        return <SignIn />;
      case AuthState.SignUp:
        return <Signup />;
      case AuthState.ConfirmSignUp:
        return <ConfirmSignup />;
      case AuthState.ResetPassword:
        return <ResetPassword />;
      default:
        return <LinearProgress />;
    }
  };

  return (
    <>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <TrackChanges fontSize="large" />
          {renderForm()}
        </div>
      </Grid>
    </>
  );
};

export default Authenticator;
