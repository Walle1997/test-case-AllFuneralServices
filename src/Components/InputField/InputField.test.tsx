import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InputField from './InputField';

describe('renders correctly', () => {
    it('type="text"', () => {
        const onChange = jest.fn();
        const element = renderer
            .create(
                <InputField
                    value="Test Value"
                    placeholder="placeholder"
                    onChange={onChange}
                />
            )
            .toJSON();
        expect(element).toMatchSnapshot();
    });

    it('type="password"', () => {
        const onChange = jest.fn();
        const element = renderer
            .create(
                <InputField
                    type="password"
                    value="Test Value"
                    placeholder="placeholder"
                    onChange={onChange}
                />
            )
            .toJSON();
        expect(element).toMatchSnapshot();
    });

    it('type="date"', () => {
        const onChange = jest.fn();
        const element = renderer
            .create(
                <InputField
                    type="date"
                    value="Test Value"
                    placeholder="placeholder"
                    onChange={onChange}
                />
            )
            .toJSON();
        expect(element).toMatchSnapshot();
    });
});

describe('checks props', () => {
    it('checks onChange prop', async () => {
        const onChange = jest.fn();
        const placeholderText = 'test input';
        const typedValue = 'Test Value';
        render(
            <InputField
                value="Test Value"
                placeholder={placeholderText}
                onChange={onChange}
            />
        );
        const input = screen.getByPlaceholderText(placeholderText);
        await userEvent.type(input, typedValue);
        expect(onChange).toHaveBeenCalledTimes(typedValue.length);
    });

    it('checks onEnter prop', async () => {
        const onChange = jest.fn();
        const onEnter = jest.fn();
        const placeholderText = 'test input';
        render(
            <InputField
                value="Test Value"
                placeholder={placeholderText}
                onChange={onChange}
                onEnter={onEnter}
            />
        );
        const input = screen.getByPlaceholderText(placeholderText);
        await userEvent.type(input, '{enter}');
        expect(onEnter).toHaveBeenCalledTimes(1);
    });
});
