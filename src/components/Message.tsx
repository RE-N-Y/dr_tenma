import React from "react";
import { Snackbar, IconButton } from "@material-ui/core";
import { MessageContext } from "../contexts";
import { Close } from "@material-ui/icons";

const Message: React.FC = () => {
  return (
    <MessageContext.Consumer>
      {(context) => {
        const handleClose = (
          event: React.SyntheticEvent | React.MouseEvent,
          reason?: string
        ) => {
          if (reason === "clickaway") {
            return;
          }

          context.setMessage("", "");
        };
        return (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            message={context.message}
            open={context.message !== ""}
            autoHideDuration={5000}
            onClose={handleClose}
            action={
              <>
                <IconButton
                  size="small"
                  aria-label="close"
                  onClick={handleClose}
                >
                  <Close />
                </IconButton>
              </>
            }
          />
        );
      }}
    </MessageContext.Consumer>
  );
};

export default Message;
