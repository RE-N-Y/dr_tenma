import React, { createContext, useReducer } from "react";

export type severity = "error" | "warning" | "info" | "success" | "";

interface MessageContext {
  message: string;
  severity: severity;
}

export enum MessageActionType {
  setMessage = "setMessage",
  setSeverity = "setSeverity",
}

interface SetMessageAction {
  type: typeof MessageActionType.setMessage;
  payload: string;
}

interface SetSeverityAction {
  type: typeof MessageActionType.setSeverity;
  payload: severity;
}

type MessageAction = SetMessageAction | SetSeverityAction;

const initMessageContext: MessageContext = {
  message: "",
  severity: "",
};

const messageReducer = (
  state = initMessageContext,
  action: MessageAction
): MessageContext => {
  switch (action.type) {
    case MessageActionType.setMessage:
      return { ...state, message: action.payload };
    case MessageActionType.setSeverity:
      return { ...state, severity: action.payload };
    default:
      return state;
  }
};

interface Store {
  state: typeof initMessageContext;
  dispatch: React.Dispatch<MessageAction>;
}

export const MessageStore = createContext<Store>({
  state: initMessageContext,
  dispatch: () => {},
});

export const MessageProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, initMessageContext);
  return (
    <MessageStore.Provider value={{ state, dispatch }}>
      {children}
    </MessageStore.Provider>
  );
};
