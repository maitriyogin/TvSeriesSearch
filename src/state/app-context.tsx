import React, {useContext, useMemo, useReducer} from 'react';
import {Show} from '../models/shows.ts';

export interface AppContextHandlers {
  showFilter: () => void;
  hideFilter: () => void;
  gotoDetails: (show: Show) => void;
  hideDetails: () => void;
}

export interface AppContextState {
  showFilter?: boolean;
  showDetails?: boolean;
  show?: Show;
}

export interface AppContextProps {
  handlers: AppContextHandlers;
  state: AppContextState;
}
export const AppContext = React.createContext<AppContextProps>({
  handlers: {
    showFilter: () => {},
    hideFilter: () => {},
    gotoDetails: (_show: Show) => {},
    hideDetails: () => {},
  },
  state: {},
});
const reducer = (
  prevState: AppContextState,
  updatedProperty: AppContextState,
) => ({
  ...prevState,
  ...updatedProperty,
});
export const AppProvider = ({children}: React.PropsWithChildren) => {
  const [state, updateAppState] = useReducer(reducer, {});
  const handlers = useMemo(
    () => ({
      showFilter: () => updateAppState({showFilter: true}),
      hideFilter: () => updateAppState({showFilter: false}),
      gotoDetails: (show: Show) => updateAppState({show, showDetails: true}),
      hideDetails: () => updateAppState({show: undefined, showDetails: false}),
    }),
    [],
  );
  const AppState = useMemo(() => ({state, handlers}), [state, handlers]);
  return <AppContext.Provider value={AppState}>{children}</AppContext.Provider>;
};

export const useAppState = () => useContext(AppContext);
