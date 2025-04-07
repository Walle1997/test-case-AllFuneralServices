import React from 'react';
import clsx from 'clsx';

import './ModalWindow.scss';

export interface ModalWindowProps {
    title: string;
    secondButton?: string;
    onClose: () => void;
    onAccept?: () => void;
}

const ModalWindow: React.FC<ModalWindowProps> = ({
    title,
    children,
    secondButton,
    onClose,
    onAccept
}) => {
    return (
        <div className="modal__window">
            <div className="modal__header">{title}</div>
            <div className="modal__content">{children}</div>
            <div className="modal__buttons">
                <div
                    className={clsx(
                        'modal__button',
                        secondButton
                            ? 'modal__button_cancel'
                            : 'modal__button_ok'
                    )}
                    onClick={onClose}>
                    {secondButton ? 'Отмена' : 'ОК'}
                </div>
                {secondButton && onAccept && (
                    <div
                        className="modal__button modal__button_accept"
                        onClick={() => {
                            onAccept();
                            onClose();
                        }}>
                        {secondButton}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModalWindow;
