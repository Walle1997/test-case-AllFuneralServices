import React from 'react';
import renderer from 'react-test-renderer';

import Loader from './Loader';

describe('renders correctly', () => {
    it('inline="false"', () => {
        const element = renderer.create(<Loader />).toJSON();
        expect(element).toMatchSnapshot();
    });

    it('inline="true"', () => {
        const element = renderer.create(<Loader inline />).toJSON();
        expect(element).toMatchSnapshot();
    });
});
