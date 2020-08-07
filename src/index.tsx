import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import { AuthProvider } from "./contexts/authContext";
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { indigo, yellow } from "@material-ui/core/colors";
import { MessageProvider } from "./contexts/messageContext";

Amplify.configure(awsExports);

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

ReactDOM.render(
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <MessageProvider>
        <App />
      </MessageProvider>
    </ThemeProvider>
  </AuthProvider>,
  document.getElementById("root")
);
