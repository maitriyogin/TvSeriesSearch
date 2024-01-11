import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {render, waitFor} from '../../test-utils.tsx';
import {Show, ShowsInput} from '../models/shows.ts';
import {useAppState} from '../state/app-context.tsx';
import {useFilterState} from '../state/filter-context.tsx';
import {pageShows, searchShows} from './search-shows.ts';
import {useSearchApi} from './useSearchApi.ts';

const Comp = ({
  showsInput,
  shows,
  _searchShows,
  _pageShows,
}: {
  showsInput: ShowsInput;
  shows?: Show[];
  _searchShows: typeof searchShows;
  _pageShows: typeof pageShows;
}) => {
  useSearchApi(_pageShows, _searchShows);
  const {state: appState, handlers: appHandlers} = useAppState();
  const {state: filterState, handlers} = useFilterState();
  useEffect(() => {
    handlers.updateFilterState(showsInput);
  }, [handlers, showsInput]);
  useEffect(() => {
    shows && appHandlers.setShows(shows);
  }, [appHandlers, shows]);
  return (
    <>
      <Text testID={'appState'}>{JSON.stringify(appState)}</Text>
      <Text testID={'filterState'}>{JSON.stringify(filterState)}</Text>
    </>
  );
};
describe('useSearchApi', () => {
  it('should set filter to star trek', async () => {
    const _pageShows = jest.fn();
    const _searchShows = jest.fn();

    const {getByTestId} = render(
      <Comp
        showsInput={{q: 'Star Trek'}}
        _searchShows={_searchShows}
        _pageShows={_pageShows}
      />,
    );
    await waitFor(() => {
      expect(getByTestId('filterState').children[0]).toEqual(
        JSON.stringify({q: 'Star Trek'}),
      );
    });
  });
  it('should call search shows with star trek', async () => {
    const _pageShows = jest.fn();
    const _searchShows = jest.fn();
    _searchShows.mockReturnValue(Promise.resolve([{id: 1}]));
    const {getByTestId} = render(
      <Comp
        showsInput={{q: 'Star Trek'}}
        _searchShows={_searchShows}
        _pageShows={_pageShows}
      />,
    );
    await waitFor(() => {
      expect(getByTestId('filterState').children[0]).toEqual(
        JSON.stringify({q: 'Star Trek'}),
      );
    });
    expect(_searchShows).toHaveBeenCalledWith({q: 'Star Trek'});
    expect(await _searchShows.mock.results[0].value).toEqual([{id: 1}]);
  });
  it('should call pageShows with page 1', async () => {
    const _pageShows = jest.fn();
    const _searchShows = jest.fn();
    _pageShows.mockReturnValue(Promise.resolve({shows: [{id: 1}]}));
    const {getByTestId} = render(
      <Comp
        showsInput={{page: 1}}
        _searchShows={_searchShows}
        _pageShows={_pageShows}
      />,
    );
    await waitFor(() => {
      expect(getByTestId('filterState').children[0]).toEqual(
        JSON.stringify({page: 1}),
      );
    });
    expect(_pageShows).toHaveBeenCalledWith({page: 1});
    expect(await _pageShows.mock.results[0].value).toEqual({shows: [{id: 1}]});
  });
  it('should call pageShows with page 2', async () => {
    const _pageShows = jest.fn();
    const _searchShows = jest.fn();
    _pageShows.mockReturnValue(Promise.resolve({shows: [{id: 1}]}));
    const {getByTestId, rerender} = render(
      <Comp
        showsInput={{q: ''}}
        // @ts-ignore
        shows={[{id: 1}]}
        _searchShows={_searchShows}
        _pageShows={_pageShows}
      />,
    );
    _pageShows.mockReturnValue(Promise.resolve({shows: [{id: 2}]}));
    rerender(
      <Comp
        showsInput={{page: 2}}
        // @ts-ignore
        _searchShows={_searchShows}
        _pageShows={_pageShows}
      />,
    );
    await waitFor(() => {
      expect(getByTestId('appState').children[0]).toEqual(
        JSON.stringify({loading: false, shows: [{id: 1}, {id: 2}]}),
      );
    });
  });
  it('should set error', async () => {
    const _pageShows = jest.fn();
    const _searchShows = jest.fn();
    _searchShows.mockReturnValue(Promise.reject('Something is wrong!'));
    const {getByTestId} = render(
      <Comp
        showsInput={{q: 'star trek'}}
        // @ts-ignore
        shows={[{id: 1}]}
        _searchShows={_searchShows}
        _pageShows={_pageShows}
      />,
    );
    await waitFor(() => {
      expect(getByTestId('appState').children[0]).toEqual(
        JSON.stringify({
          loading: false,
          shows: [{id: 1}],
          error: 'Something is wrong!',
        }),
      );
    });
  });
});
