import React, {useContext, useMemo, useReducer} from 'react';
import {Show} from '../models/shows.ts';

export interface AppContextHandlers {
  gotoDetails: (show: Show) => void;
  hideDetails: () => void;
  toggleFavorite: (id: number) => void;
  setShows: (shows: Show[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error?: string) => void;
}

export interface AppContextState {
  showDetails?: boolean;
  show?: Show;
  shows?: Show[];
  favourites?: number[];
  loading?: boolean;
  error?: string;
}

export interface AppContextProps {
  handlers: AppContextHandlers;
  state: AppContextState;
}
export const AppContext = React.createContext<AppContextProps>({
  handlers: {
    gotoDetails: (_show: Show) => {},
    hideDetails: () => {},
    toggleFavorite: () => {},
    setShows: (_shows: Show[]) => {},
    setLoading: (_loading: boolean) => {},
    setError: (_error?: string) => {},
  },
  state: {favourites: [], loading: false},
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
  const favourites = state.favourites;
  const handlers = useMemo(
    () => ({
      gotoDetails: (show: Show) => {
        updateAppState({show, showDetails: true});
      },
      hideDetails: () => {
        updateAppState({show: undefined, showDetails: false});
      },
      toggleFavorite: (id: number) =>
        updateAppState({
          favourites: favourites?.includes(id)
            ? favourites.filter(_id => _id !== id)
            : [...(favourites ?? []), id],
        }),
      setShows: (shows: Show[]) => updateAppState({shows: shows}),
      setLoading: (loading: boolean) => updateAppState({loading}),
      setError: (error?: string) => updateAppState({error, loading: false}),
    }),
    [favourites, updateAppState],
  );
  const AppState = useMemo(() => ({state, handlers}), [state, handlers]);
  return <AppContext.Provider value={AppState}>{children}</AppContext.Provider>;
};

export const useAppState = () => useContext(AppContext);
