import {fireEvent} from '@testing-library/react-native';
import React from 'react';
import {Text} from 'react-native';
import {render, waitFor} from '../../test-utils.tsx';
import {useFilterState} from '../state/filter-context.tsx';
import {SearchBarContainer} from './SearchBar.tsx';

const Comp = ({}) => {
  const {state: filterState} = useFilterState();
  return (
    <>
      <SearchBarContainer />
      <Text testID={'filterState'}>{JSON.stringify(filterState)}</Text>
    </>
  );
};
describe('<SearchBar>', () => {
  it('should search bar with star trek', () => {
    const {getByTestId} = render(<SearchBarContainer />);
    const searchInput = getByTestId('searchInput');
    expect(searchInput).toBeDefined();
    expect(searchInput.props.value).toEqual('Star Trek');
  });
  it('should change value in search bar', async () => {
    const {getByTestId} = render(<Comp />);
    const searchInput = getByTestId('searchInput');
    expect(searchInput).toBeDefined();
    expect(searchInput.props.value).toEqual('Star Trek');
    fireEvent.changeText(searchInput, 'Hot Rats');
    fireEvent(searchInput, 'submitEditing', 'Hot Rats');

    await waitFor(() => {
      expect(getByTestId('filterState').children[0]).toEqual(
        JSON.stringify({q: 'Hot Rats'}),
      );
    });
  });
  it('should change clear the search bar', async () => {
    const {getByTestId} = render(<Comp />);
    const searchInput = getByTestId('searchInput');
    expect(searchInput).toBeDefined();
    expect(searchInput.props.value).toEqual('Star Trek');
    fireEvent.changeText(searchInput, '');
    fireEvent(searchInput, 'submitEditing', '');

    await waitFor(() => {
      expect(getByTestId('filterState').children[0]).toEqual(
        JSON.stringify({page: 1}),
      );
    });
  });
});
