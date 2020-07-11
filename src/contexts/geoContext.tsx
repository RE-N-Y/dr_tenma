import React, { createContext, useReducer } from "react";

interface GeoContext {
  longitude: number;
  latitude: number;
}

export enum GeoActionType {
  setLocation = "setLocation",
}

interface SetLocationAction {
  type: typeof GeoActionType.setLocation;
  longitude: number;
  latitude: number;
}

type GeoAction = SetLocationAction;

const initGeoContext: GeoContext = {
  longitude: 139.7745,
  latitude: 35.7023,
};

const geoReducer = (state = initGeoContext, action: GeoAction): GeoContext => {
  switch (action.type) {
    case GeoActionType.setLocation:
      return {
        ...state,
        longitude: action.longitude,
        latitude: action.latitude,
      };
    default:
      return state;
  }
};

interface Store {
  state: typeof initGeoContext;
  dispatch: React.Dispatch<GeoAction>;
}

export const GeoStore = createContext<Store>({
  state: initGeoContext,
  dispatch: () => {},
});

export const GeoProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(geoReducer, initGeoContext);
  return (
    <GeoStore.Provider value={{ state, dispatch }}>
      {children}
    </GeoStore.Provider>
  );
};
