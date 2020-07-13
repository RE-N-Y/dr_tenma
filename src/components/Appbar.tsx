import React, { useContext } from "react";
import { AuthStore } from "../contexts/authContext";
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Popover,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Auth } from "aws-amplify";
import { TrackChanges } from "@material-ui/icons";
import Geolocator from "./Geolocator";

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
    logo: {
      marginRight: theme.spacing(2),
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

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <AppBar position="absolute">
      <Toolbar>
        <TrackChanges className={classes.logo} fontSize="large" />
        <Typography variant="h6" className={classes.title}>
          DR. TENMA
        </Typography>

        <IconButton onClick={handleClick}>
          <Avatar className={classes.avatar}>
            {state.user?.attributes?.email[0].toUpperCase()}
          </Avatar>
        </IconButton>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Signout />
        </Popover>
        <Geolocator />
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
