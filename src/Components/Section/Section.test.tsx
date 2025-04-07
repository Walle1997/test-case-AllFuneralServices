import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Section from './Section';

describe('renders correctly', () => {
    it('with text title', () => {
        const element = renderer
            .create(<Section title="Test Button" />)
            .toJSON();
        expect(element).toMatchSnapshot();
    });

    it('with title as Component', () => {
        const element = renderer
            .create(<Section title={<h1>Title</h1>} />)
            .toJSON();
        expect(element).toMatchSnapshot();
    });
});

it('checks title prop', () => {
    const title = 'Some Title';
    render(<Section title={title} />);
    const sectionTitle = screen.getByText(title);
    expect(sectionTitle).toBeInTheDocument();
});
