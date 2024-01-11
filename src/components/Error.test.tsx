import {fireEvent} from '@testing-library/react-native';
import React from 'react';
import {render} from '../../test-utils.tsx';
import {useAppState} from '../state/app-context.tsx';
import {ErrorContainer} from './Error.tsx';

jest.mock('../state/app-context.tsx', () => ({
  AppProvider: ({children}: React.PropsWithChildren) => <>{children}</>,
  useAppState: jest.fn(),
}));
describe('<Error>', () => {
  it('should showError', () => {
    const setError = jest.fn();
    (useAppState as jest.Mock).mockReturnValue({
      state: {
        error: 'Somethings Wrong!!',
      },
      handlers: {
        setError,
      },
    });
    const {getByText} = render(<ErrorContainer />);
    expect(getByText('Somethings Wrong!!')).toBeDefined();
  });
  it('should dismiss error', () => {
    const setError = jest.fn();
    (useAppState as jest.Mock).mockReturnValue({
      state: {
        error: 'Somethings Wrong!!',
      },
      handlers: {
        setError,
      },
    });
    const {getByText, getByTestId} = render(<ErrorContainer />);
    expect(getByText('Somethings Wrong!!')).toBeDefined();
    const close = getByTestId('error-dismiss');
    fireEvent.press(close);
    expect(setError).toHaveBeenCalledWith(undefined);
  });
  it('should hide error', () => {
    const setError = jest.fn();
    (useAppState as jest.Mock).mockReturnValue({
      state: {
        error: undefined,
      },
      handlers: {
        setError,
      },
    });
    const {queryByText} = render(<ErrorContainer />);
    expect(queryByText('Somethings Wrong!!')).toBeNull();
  });
  it('should hide error on empty error', () => {
    const setError = jest.fn();
    (useAppState as jest.Mock).mockReturnValue({
      state: {
        error: '',
      },
      handlers: {
        setError,
      },
    });
    const {queryByText} = render(<ErrorContainer />);
    expect(queryByText('Somethings Wrong!!')).toBeNull();
  });
});
