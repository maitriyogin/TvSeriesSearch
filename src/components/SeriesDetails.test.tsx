import {fireEvent} from '@testing-library/react-native';
import React from 'react';
import {render} from '../../test-utils.tsx';
import {Show} from '../models/shows.ts';
import {useAppState} from '../state/app-context.tsx';
import {SeriesDetailsContainer} from './SeriesDetails.tsx';

jest.mock('../state/app-context.tsx', () => ({
  AppProvider: ({children}: React.PropsWithChildren) => <>{children}</>,
  useAppState: jest.fn(),
}));
describe('<SeriesDetails>', () => {
  it('should show details', () => {
    const hideDetails = jest.fn();
    (useAppState as jest.Mock).mockReturnValue({
      state: {
        shows: [
          {
            id: 1,
            name: 'Star Trek',
          },
        ] as unknown as Show[],
        showDetails: true,
        show: {
          id: 1,
          name: 'Star Trek',
        },
      },
      handlers: {
        hideDetails,
      },
    });
    const {getByTestId, getByText} = render(<SeriesDetailsContainer />);
    expect(getByTestId('detailsScreen')).toBeDefined();
    expect(getByText('Star Trek')).toBeDefined();
  });
  it('should show details hide', () => {
    const hideDetails = jest.fn();
    (useAppState as jest.Mock).mockReturnValue({
      state: {
        shows: [
          {
            id: 1,
            name: 'Star Trek',
          },
        ] as unknown as Show[],
        showDetails: true,
        show: {
          id: 1,
          name: 'Star Trek',
        },
      },
      handlers: {
        hideDetails,
      },
    });
    const {getByTestId, getByText} = render(<SeriesDetailsContainer />);
    expect(getByTestId('detailsScreen')).toBeDefined();
    expect(getByText('Star Trek')).toBeDefined();
    const close = getByTestId('details-close');
    fireEvent.press(close);
    expect(hideDetails).toHaveBeenCalled();
  });
});
