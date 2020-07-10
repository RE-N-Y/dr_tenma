import React, { useContext } from "react";
import { AuthState, AuthContext } from "./../contexts";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Auth } from "aws-amplify";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const Signout: React.FC = () => {
  const handleSignout = async () => {
    await Auth.signOut();
  };
  return (
    <Button variant="contained" onClick={handleSignout}>
      Sign out
    </Button>
  );
};

const Appbar: React.FC = () => {
  const { user, authState } = useContext(AuthContext);
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Avatar className={classes.avatar}>
          {user?.attributes?.email[0].toUpperCase()}
        </Avatar>
        <Typography variant="h6" className={classes.title}>
          Dr. Tenma
        </Typography>
        {user && authState === AuthState.SignedIn && <Signout />}
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
