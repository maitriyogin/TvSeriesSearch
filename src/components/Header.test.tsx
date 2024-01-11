import React from 'react';
import {Text} from 'react-native';
import {render} from '../../test-utils.tsx';
import {Header} from './Header.tsx';

describe('<Header>', () => {
  it('should render', () => {
    const Comp = () => (
      <Header>
        <Text>Jake</Text>
      </Header>
    );
    const {getByText} = render(<Comp />);
    expect(getByText('Tv Series Search')).toBeTruthy();
    expect(getByText('Jake')).toBeTruthy();
  });
});
