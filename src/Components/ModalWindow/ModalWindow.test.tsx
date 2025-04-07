import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ModalWindow from './ModalWindow';

describe('renders correctly', () => {
    it('with 1 button', () => {
        const onClose = jest.fn();
        const element = renderer
            .create(<ModalWindow title="Modal title" onClose={onClose} />)
            .toJSON();
        expect(element).toMatchSnapshot();
    });

    it('with 2 buttons', () => {
        const onClose = jest.fn();
        const onAccept = jest.fn();
        const element = renderer
            .create(
                <ModalWindow
                    title="Modal title"
                    secondButton="Action"
                    onClose={onClose}
                    onAccept={onAccept}
                />
            )
            .toJSON();
        expect(element).toMatchSnapshot();
    });
});

describe('checks props', () => {
    it('onClose', () => {
        const onClose = jest.fn();
        render(<ModalWindow title="Modal title" onClose={onClose} />);
        const button = screen.getByText('ОК');
        userEvent.click(button);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('onClose', () => {
        const onClose = jest.fn();
        const onAccept = jest.fn();
        render(
            <ModalWindow
                title="Modal title"
                secondButton="Action"
                onClose={onClose}
                onAccept={onAccept}
            />
        );
        const button = screen.getByText('Action');
        userEvent.click(button);
        expect(onAccept).toHaveBeenCalledTimes(1);
    });
});
