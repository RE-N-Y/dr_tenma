import React from "react";
import { AuthState } from "@aws-amplify/ui-components";

interface AuthContext {
  user: any | undefined;
  authState: AuthState;
}

export const AuthContext = React.createContext<AuthContext>({
  user: undefined,
  authState: AuthState.SignedOut,
});
