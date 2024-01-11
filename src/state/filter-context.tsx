import React, {useContext, useMemo, useReducer} from 'react';
import {ShowsInput} from '../models/shows.ts';
import {isEmpty} from '../utils/utils.ts';

export interface FilterContextHandlers {
  incPage: () => void;
  updateFilterState: (_state: ShowsInput) => void;
}

export interface FilterContextProps {
  handlers: FilterContextHandlers;
  state: ShowsInput;
}
export const FilterContext = React.createContext<FilterContextProps>({
  handlers: {
    incPage: () => {},
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
      incPage: () => updateFilterState({page: (state.page ?? 0) + 1}),
      updateFilterState: (_state: ShowsInput) => {
        return updateFilterState({
          ..._state,
          ...(isEmpty(_state.q) && (_state.page === 1 || !state.page)
            ? {q: undefined, page: 1}
            : {}),
          ...(!isEmpty(_state.q) ? {page: undefined} : {}),
        });
      },
    }),
    [state.page],
  );
  const filterState = useMemo(() => ({state, handlers}), [state, handlers]);
  return (
    <FilterContext.Provider value={filterState}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterState = () => useContext(FilterContext);
