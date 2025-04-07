import React from 'react';
import ReactDOM from 'react-dom';

import './ModalWrapper.scss';
import ModalWindow, { ModalWindowProps } from './ModalWindow';

interface ModalWrapperProps extends ModalWindowProps {
    show: boolean;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ show, ...props }) => {
    if (!show) return null;

    return ReactDOM.createPortal(
        <div className="modal">
            <ModalWindow {...props} />
        </div>,
        document.body
    );
};

export default ModalWrapper;
