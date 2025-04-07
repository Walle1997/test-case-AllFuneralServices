import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EditableNode from './EditableNode';

describe('renders correctly', () => {
    it('with edit mode', () => {
        const changeValue = jest.fn();
        const element = renderer
            .create(
                <EditableNode
                    editMode={true}
                    value="Some Value"
                    changeValue={changeValue}
                />
            )
            .toJSON();
        expect(element).toMatchSnapshot();
    });

    it('without edit mode', () => {
        const changeValue = jest.fn();
        const element = renderer
            .create(
                <EditableNode
                    editMode={false}
                    value="Some Value"
                    changeValue={changeValue}
                />
            )
            .toJSON();
        expect(element).toMatchSnapshot();
    });
});

it('checks changeValue prop', async () => {
    const defaultValue = 'Some Value';
    const typedValue = '123';
    const changeValue = jest.fn();
    render(
        <EditableNode
            editMode={true}
            value={defaultValue}
            changeValue={changeValue}
        />
    );
    const input = screen.getByRole('textbox');
    await userEvent.type(input, typedValue);
    userEvent.click(screen.getByTestId('save-icon'));
    expect(changeValue).toHaveBeenCalledTimes(1);
    expect(changeValue).toHaveBeenCalledWith(defaultValue + typedValue);
});
