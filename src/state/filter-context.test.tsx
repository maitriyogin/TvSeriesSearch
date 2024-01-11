import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {render, renderHook, waitFor} from '../../test-utils';
import {ShowsInput} from '../models/shows.ts';
import {usePrevious} from '../utils/hook-utils.tsx';
import {useFilterState} from './filter-context.tsx';

const Comp = ({state, incPage}: {state?: ShowsInput; incPage?: boolean}) => {
  const {state: filterState, handlers} = useFilterState();
  const pIncPage = usePrevious(incPage);
  const pState = usePrevious(state);
  useEffect(() => {
    state && pState !== state && handlers.updateFilterState(state);
  }, [handlers, state]);
  useEffect(() => {
    pIncPage !== incPage && handlers.incPage();
  }, [handlers, incPage, pIncPage]);
  console.log('-------', filterState, incPage);
  return (
    <>
      <Text testID={'filterState'}>{JSON.stringify(filterState)}</Text>
    </>
  );
};
describe('Filter Context', () => {
  it('should have initial state', () => {
    const {result} = renderHook(() => useFilterState());
    expect(result.current.state).toEqual({});
  });
  it('should update state q', async () => {
    const {getByTestId} = render(<Comp state={{q: 'Rick and Morty'}} />);
    await waitFor(() => {
      const result = getByTestId('filterState').children[0];
      expect(result).toEqual(JSON.stringify({q: 'Rick and Morty'}));
    });
  });
  it('should clear state q', async () => {
    const {getByTestId} = render(<Comp state={{q: ''}} />);
    await waitFor(() => {
      const result = getByTestId('filterState').children[0];
      expect(result).toEqual(JSON.stringify({page: 1}));
    });
  });
  it('should update page', async () => {
    const {getByTestId, rerender} = render(<Comp state={{page: 1}} />);
    await waitFor(() => {
      const result = getByTestId('filterState').children[0];
      expect(result).toEqual(JSON.stringify({page: 1}));
    });
    rerender(<Comp state={{page: 1}} incPage={true} />);
    await waitFor(() => {
      const result = getByTestId('filterState').children[0];
      expect(result).toEqual(JSON.stringify({page: 2}));
    });
  });
  it('should inc page then query', async () => {
    const {getByTestId, rerender} = render(<Comp state={{page: 1}} />);
    await waitFor(() => {
      const result = getByTestId('filterState').children[0];
      expect(result).toEqual(JSON.stringify({page: 1}));
    });
    rerender(<Comp state={{page: 1}} incPage={true} />);
    await waitFor(() => {
      const result = getByTestId('filterState').children[0];
      expect(result).toEqual(JSON.stringify({page: 2}));
    });
    rerender(<Comp state={{q: 'Adventure time'}} incPage={true} />);
    await waitFor(() => {
      const result = getByTestId('filterState').children[0];
      expect(result).toEqual(JSON.stringify({q: 'Adventure time'}));
    });
  });
});
