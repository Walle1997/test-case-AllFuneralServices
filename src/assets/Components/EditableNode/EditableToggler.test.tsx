import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EditableToggler from './EditableToggler';

describe('renders correctly', () => {
    it('with edit mode', () => {
        const toggleEditMode = jest.fn();
        const element = renderer
            .create(
                <EditableToggler
                    editMode={true}
                    toggleEditMode={toggleEditMode}
                />
            )
            .toJSON();
        expect(element).toMatchSnapshot();
    });

    it('without edit mode', () => {
        const toggleEditMode = jest.fn();
        const element = renderer
            .create(
                <EditableToggler
                    editMode={false}
                    toggleEditMode={toggleEditMode}
                />
            )
            .toJSON();
        expect(element).toMatchSnapshot();
    });
});

describe('checks toggleEditMode prop', () => {
    it('with edit mode', () => {
        const toggleEditMode = jest.fn();
        const { rerender } = render(
            <EditableToggler editMode={true} toggleEditMode={toggleEditMode} />
        );
        const icon = screen.getByTestId('close-icon');
        userEvent.click(icon);
        expect(toggleEditMode).toHaveBeenCalledTimes(1);
        rerender(
            <EditableToggler editMode={false} toggleEditMode={toggleEditMode} />
        );
        expect(screen.getByTestId('edit-icon')).toBeInTheDocument();
    });

    it('without edit mode', () => {
        const toggleEditMode = jest.fn();
        const { rerender } = render(
            <EditableToggler editMode={false} toggleEditMode={toggleEditMode} />
        );
        const icon = screen.getByTestId('edit-icon');
        userEvent.click(icon);
        expect(toggleEditMode).toHaveBeenCalledTimes(1);
        rerender(
            <EditableToggler editMode={true} toggleEditMode={toggleEditMode} />
        );
        expect(screen.getByTestId('close-icon')).toBeInTheDocument();
    });
});
