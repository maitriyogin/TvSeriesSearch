import React, {useContext, useMemo, useReducer} from 'react';
import {
  ShowGenreEnum,
  ShowStatusEnum,
  ShowTypeEnum,
  SortEnum,
} from '../models/show-enums.ts';
import {ShowsInput} from '../models/shows.ts';

export interface FilterContextHandlers {
  updateQ: (val: string) => void;
  setPage: (val: number) => void;
  setShowStatus: (val: ShowStatusEnum) => void;
  setShowType: (val: ShowTypeEnum) => void;
  setGenre: (val: ShowGenreEnum) => void;
  setSort: (val: SortEnum) => void;
  updateFilterState: (_state: ShowsInput) => void;
}

export interface FilterContextProps {
  handlers: FilterContextHandlers;
  state: ShowsInput;
}
export const FilterContext = React.createContext<FilterContextProps>({
  handlers: {
    updateQ: (_q: string) => {},
    setPage: (_page: number) => {},
    setShowStatus: (_showStatus_enum: ShowStatusEnum) => {},
    setShowType: (_showType_enum: ShowTypeEnum) => {},
    setGenre: (_genre: ShowGenreEnum) => {},
    setSort: (_sort: SortEnum) => {},
    updateFilterState: (_state: ShowsInput) => {},
  },
  state: {},
});
export const filterReducer = (
  prevState: ShowsInput,
  updatedProperty: ShowsInput,
) => ({
  ...prevState,
  ...updatedProperty,
});
export const FilterProvider = ({children}: React.PropsWithChildren) => {
  const [state, updateFilterState] = useReducer(filterReducer, {
    q: 'Star Trek',
  });
  const handlers = useMemo(
    () => ({
      updateQ: (q: string) => updateFilterState({q}),
      setPage: (page: number) => updateFilterState({page}),
      setShowStatus: (showStatus_enum: ShowStatusEnum) =>
        updateFilterState({showStatus_enum}),
      setShowType: (showType_enum: ShowTypeEnum) =>
        updateFilterState({showType_enum}),
      setGenre: (genre: ShowGenreEnum) => updateFilterState({genre}),
      setSort: (sort: SortEnum) => updateFilterState({sort}),
      updateFilterState: (state: ShowsInput) => updateFilterState({...state}),
    }),
    [],
  );
  const filterState = useMemo(() => ({state, handlers}), [state, handlers]);
  return (
    <FilterContext.Provider value={filterState}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterState = () => useContext(FilterContext);
