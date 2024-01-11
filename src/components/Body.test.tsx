import React from 'react';
import {Text} from 'react-native';
import {render} from '../../test-utils.tsx';
import {Body} from './Body.tsx';

describe('<Body>', () => {
  it('should render', () => {
    const Comp = () => (
      <Body>
        <Text>Jake</Text>
      </Body>
    );
    const {getByText} = render(<Comp />);
    expect(getByText('Jake')).toBeTruthy();
  });
});
