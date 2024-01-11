import {useEffect} from 'react';
import {Text} from 'react-native';
import {render, renderHook, waitFor} from '../../test-utils';
import {Show} from '../models/shows.ts';
import {usePrevious} from '../utils/hook-utils.tsx';
import {useAppState} from './app-context.tsx';

const Comp = ({
  triggers,
}: {
  triggers: {
    loading?: boolean;
    gotToDetails?: Show;
    hideDetails?: boolean;
    toggleFav?: number;
    setShows?: Show[];
  };
}) => {
  const {state: appState, handlers} = useAppState();
  const ptriggers = usePrevious(triggers);
  useEffect(() => {
    ptriggers?.loading !== triggers.loading &&
      triggers.loading !== undefined &&
      handlers.setLoading(!!triggers.loading);
  }, [handlers, triggers.loading, ptriggers?.loading]);
  useEffect(() => {
    ptriggers?.gotToDetails !== triggers.gotToDetails &&
      triggers.gotToDetails &&
      handlers.gotoDetails(triggers.gotToDetails);
  }, [handlers, ptriggers?.gotToDetails, triggers.gotToDetails]);
  useEffect(() => {
    ptriggers?.hideDetails !== triggers.hideDetails &&
      triggers.hideDetails &&
      handlers.hideDetails();
  }, [handlers, ptriggers?.hideDetails, triggers.hideDetails]);
  useEffect(() => {
    ptriggers?.toggleFav !== triggers.toggleFav &&
      triggers.toggleFav &&
      handlers.toggleFavorite(triggers.toggleFav);
  }, [handlers, ptriggers?.toggleFav, triggers.toggleFav]);
  useEffect(() => {
    ptriggers?.setShows !== triggers.setShows &&
      triggers.setShows &&
      handlers.setShows(triggers.setShows);
  }, [handlers, ptriggers?.setShows, triggers.setShows]);
  return (
    <>
      <Text testID={'appState'}>{JSON.stringify(appState)}</Text>
    </>
  );
};
describe('App Context', () => {
  it('should have initial state', () => {
    const {result} = renderHook(() => useAppState());
    expect(result.current.state).toEqual({loading: false, favourites: []});
  });
  it('should have setloading', async () => {
    const {getByTestId} = render(<Comp triggers={{loading: true}} />);
    await waitFor(() => {
      const result = getByTestId('appState').children[0];
      expect(result).toEqual(JSON.stringify({loading: true}));
    });
  });
  it('should have details', async () => {
    const {getByTestId, rerender} = render(
      // @ts-ignore
      <Comp triggers={{gotToDetails: {id: 1}}} />,
    );
    await waitFor(() => {
      const result = getByTestId('appState').children[0];
      expect(result).toEqual(
        JSON.stringify({
          show: {id: 1},
          showDetails: true,
        }),
      );
    });
    rerender(<Comp triggers={{hideDetails: true}} />);
    await waitFor(() => {
      const result = getByTestId('appState').children[0];
      expect(result).toEqual(
        JSON.stringify({
          show: undefined,
          showDetails: false,
        }),
      );
    });
  });
  it('should have favourites', async () => {
    const {getByTestId, rerender} = render(<Comp triggers={{toggleFav: 1}} />);
    await waitFor(() => {
      const result = getByTestId('appState').children[0];
      expect(result).toEqual(
        JSON.stringify({
          favourites: [1],
        }),
      );
    });
    rerender(<Comp triggers={{toggleFav: 2}} />);
    await waitFor(() => {
      const result = getByTestId('appState').children[0];
      expect(result).toEqual(
        JSON.stringify({
          favourites: [1, 2],
        }),
      );
    });
    rerender(<Comp triggers={{toggleFav: 1}} />);
    await waitFor(() => {
      const result = getByTestId('appState').children[0];
      expect(result).toEqual(
        JSON.stringify({
          favourites: [2],
        }),
      );
    });
    rerender(<Comp triggers={{toggleFav: 2}} />);
    await waitFor(() => {
      const result = getByTestId('appState').children[0];
      expect(result).toEqual(
        JSON.stringify({
          favourites: [],
        }),
      );
    });
  });
  it('should have shows', async () => {
    const {getByTestId, rerender} = render(
      // @ts-ignore
      <Comp triggers={{setShows: [{id: 1}]}} />,
    );
    await waitFor(() => {
      const result = getByTestId('appState').children[0];
      expect(result).toEqual(
        JSON.stringify({
          shows: [{id: 1}],
        }),
      );
    });
    // @ts-ignore
    rerender(<Comp triggers={{setShows: [{id: 2}]}} />);
    await waitFor(() => {
      const result = getByTestId('appState').children[0];
      expect(result).toEqual(
        JSON.stringify({
          shows: [{id: 2}],
        }),
      );
    });
    // @ts-ignore
    rerender(<Comp triggers={{setShows: []}} />);
    await waitFor(() => {
      const result = getByTestId('appState').children[0];
      expect(result).toEqual(
        JSON.stringify({
          shows: [],
        }),
      );
    });
  });
});
