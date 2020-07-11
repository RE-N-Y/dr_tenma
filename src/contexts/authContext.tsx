import React, { createContext, useReducer } from "react";

export enum AuthState {
  Signin = "Signin",
  SignedIn = "SingedIn",
  SignUp = "SignUp",
  ConfirmSignUp = "ConfirmSignUp",
  ResetPassword = "ResetPassword",
  ConfirmResetPassword = "ConfirmResetPassword",
  CompletePassword = "CompletePassword",
  Loading = "Loading",
}

interface AuthContext {
  user: any | undefined;
  authState: AuthState;
}

export enum AuthActionType {
  setUser = "setUser",
  setAuthState = "setAuthState",
}

interface SetUserAction {
  type: typeof AuthActionType.setUser;
  payload: any | undefined;
}

interface SetAuthStateAction {
  type: typeof AuthActionType.setAuthState;
  payload: AuthState;
}

type AuthAction = SetUserAction | SetAuthStateAction;

const initAuthContext: AuthContext = {
  user: undefined,
  authState: AuthState.Signin,
};

const authReducer = (
  state = initAuthContext,
  action: AuthAction
): AuthContext => {
  console.log({ state, action });
  switch (action.type) {
    case AuthActionType.setUser:
      return { ...state, user: action.payload };
    case AuthActionType.setAuthState:
      return { ...state, authState: action.payload };
    default:
      return state;
  }
};

interface Store {
  state: typeof initAuthContext;
  dispatch: React.Dispatch<AuthAction>;
}

export const AuthStore = createContext<Store>({
  state: initAuthContext,
  dispatch: () => {},
});

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initAuthContext);
  return (
    <AuthStore.Provider value={{ state, dispatch }}>
      {children}
    </AuthStore.Provider>
  );
};