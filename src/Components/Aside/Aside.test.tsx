import React from 'react';
import renderer from 'react-test-renderer';

import Aside from './Aside';

it('renders correctly', () => {
    const element = renderer.create(<Aside className="test-class" />).toJSON();
    expect(element).toMatchSnapshot();
});
