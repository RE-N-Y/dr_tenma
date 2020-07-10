import React from "react";

export enum AuthState {
  SignIn = "SignIn",
  SignedIn = "SingedIn",
  SignUp = "SignUp",
  ConfirmSignUp = "ConfirmSignUp",
  ResetPassword = "ResetPassword",
  Loading = "Loading",
}

interface AuthContext {
  user: any | undefined;
  authState: AuthState;
  setUser: (user: any | undefined) => void;
  setAuthState: (authState: AuthState) => void;
}

export const AuthContext = React.createContext<AuthContext>({
  user: undefined,
  authState: AuthState.SignIn,
  setUser: (user) => {},
  setAuthState: (authState) => {},
});

type severity = "error" | "warning" | "info" | "success" | "";

interface MessageContext {
  message: string;
  severity: severity;
  setMessage: (message: string, severity: severity) => void;
}

export const MessageContext = React.createContext<MessageContext>({
  message: "",
  severity: "",
  setMessage: (message, severityy) => {},
});
