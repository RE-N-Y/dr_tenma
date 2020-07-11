import React, { useContext } from "react";
import { Snackbar, IconButton } from "@material-ui/core";
import { MessageStore, MessageActionType } from "../contexts/messageContext";
import { Close } from "@material-ui/icons";

const Message: React.FC = () => {
  const { state, dispatch } = useContext(MessageStore);

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch({ type: MessageActionType.setMessage, payload: "" });
    dispatch({ type: MessageActionType.setSeverity, payload: "" });
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      message={state.message}
      open={state.message !== ""}
      autoHideDuration={5000}
      onClose={handleClose}
      action={
        <>
          <IconButton size="small" aria-label="close" onClick={handleClose}>
            <Close />
          </IconButton>
        </>
      }
    />
  );
};

export default Message;
