import React from 'react';
import renderer from 'react-test-renderer';

import MenuItem from './MenuItem';
import { AddIcon } from '../icons';

it('renders correctly', () => {
    const element = renderer
        .create(
            <MenuItem>
                <AddIcon />
            </MenuItem>
        )
        .toJSON();
    expect(element).toMatchSnapshot();
});
