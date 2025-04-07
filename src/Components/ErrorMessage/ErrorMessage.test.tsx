import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import ErrorMessage from './ErrorMessage';

it('renders correctly', () => {
    const element = renderer
        .create(<ErrorMessage error="Test Message" />)
        .toJSON();
    expect(element).toMatchSnapshot();
});

it('checks error prop', () => {
    const error = 'Some Error';
    render(<ErrorMessage error={error} />);
    const element = screen.getByText(error);
    expect(element).toBeInTheDocument();
});
