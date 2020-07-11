import React, { useContext } from "react";
import { AuthState, AuthStore } from "../contexts/authContext";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Auth } from "aws-amplify";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      marginRight: theme.spacing(2),
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    title: {
      flexGrow: 1,
    },
  })
);

const Signout: React.FC = () => {
  const handleSignout = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button variant="contained" onClick={handleSignout}>
      Sign out
    </Button>
  );
};

const Appbar: React.FC = () => {
  const { state } = useContext(AuthStore);
  const classes = useStyles();

  return (
    <AppBar position="absolute">
      <Toolbar>
        <Avatar className={classes.avatar}>
          {state.user?.attributes?.email[0].toUpperCase()}
        </Avatar>
        <Typography variant="h6" className={classes.title}>
          Dr. Tenma
        </Typography>
        {state.user && state.authState === AuthState.SignedIn && <Signout />}
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
