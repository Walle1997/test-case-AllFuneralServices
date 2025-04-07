import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import IconButton from './IconButton';
import { AddIcon } from '../icons';

it('renders correctly', () => {
    const onClick = jest.fn();
    const element = renderer
        .create(<IconButton Icon={AddIcon} onClick={onClick} />)
        .toJSON();
    expect(element).toMatchSnapshot();
});

it('checks onClick prop', () => {
    const onClick = jest.fn();
    render(<IconButton Icon={AddIcon} onClick={onClick} />);
    const icon = screen.getByTestId('add-icon');
    userEvent.click(icon);
    expect(onClick).toHaveBeenCalledTimes(1);
});
