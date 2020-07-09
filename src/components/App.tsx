import React, { useState, useEffect } from "react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import { AuthContext } from "../contexts";
import Authenticator from "./Authenticator";
import Dashboard from "./Dashboard";

const App: React.FC = () => {
  const [user, setUser] = useState<any | undefined>(undefined);
  const [authState, setAuthState] = useState<AuthState>(AuthState.SignedOut);

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, authState }}>
      {authState === AuthState.SignedIn && user ? (
        <Dashboard />
      ) : (
        <Authenticator />
      )}
    </AuthContext.Provider>
  );
};

export default App;
