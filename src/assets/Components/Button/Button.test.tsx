import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from './Button';

it('renders correctly', () => {
    const element = renderer.create(<Button text="Test Button" />).toJSON();
    expect(element).toMatchSnapshot();
});

it('checks onChange prop', () => {
    const onClick = jest.fn();
    const buttonText = 'Some Text';
    render(<Button text={buttonText} onClick={onClick} />);
    const button = screen.getByText(buttonText);
    userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
});
