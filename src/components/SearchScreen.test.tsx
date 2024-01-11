import {fireEvent} from '@testing-library/react-native';
import React from 'react';
import {render} from '../../test-utils.tsx';
import {Show} from '../models/shows.ts';
import {AppContextHandlers, useAppState} from '../state/app-context.tsx';
import {SearchScreen} from './SearchScreen.tsx';

jest.mock('../api/useSearchApi.ts', () => ({
  useSearchApi: jest.fn(),
  useSearchApiContainer: jest.fn(),
}));
jest.mock('../state/app-context.tsx', () => ({
  AppProvider: ({children}: React.PropsWithChildren) => <>{children}</>,
  useAppState: jest.fn(),
}));
describe('<SearchScreen>', () => {
  it('should render an item', () => {
    const gotoDetails = jest.fn();
    (useAppState as jest.Mock).mockReturnValue({
      state: {
        shows: [
          {
            id: 1,
            name: 'Star Trek',
          },
        ] as unknown as Show[],
      },
      handlers: {
        gotoDetails,
      } as unknown as AppContextHandlers,
    });
    const {getByText} = render(<SearchScreen />);
    expect(getByText('Star Trek')).toBeDefined();
  });
  it('should go to details', () => {
    const gotoDetails = jest.fn();
    (useAppState as jest.Mock).mockReturnValue({
      state: {
        shows: [
          {
            id: 1,
            name: 'Star Trek',
          },
        ] as unknown as Show[],
      },
      handlers: {
        gotoDetails,
      } as unknown as AppContextHandlers,
    });
    const {getByTestId} = render(<SearchScreen />);
    const starTrekRow = getByTestId('series-1');
    expect(getByTestId('series-1')).toBeDefined();
    fireEvent.press(starTrekRow);
    expect(gotoDetails).toHaveBeenCalledWith({id: 1, name: 'Star Trek'});
  });
});
