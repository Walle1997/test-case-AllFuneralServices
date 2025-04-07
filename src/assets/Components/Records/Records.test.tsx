import React from 'react';
import renderer from 'react-test-renderer';

import Records, { Record } from './Records';

it('renders correctly', () => {
    const element = renderer
        .create(
            <Records>
                <Record name="first">
                    <span>First Value</span>
                </Record>
                <Record name="second">
                    <span>Second Value</span>
                </Record>
                <Record name="third">
                    <span>Third Value</span>
                </Record>
            </Records>
        )
        .toJSON();
    expect(element).toMatchSnapshot();
});
