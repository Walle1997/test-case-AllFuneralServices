import React from 'react';

import './Button.scss';
import { AddIcon } from '../icons';

interface ButtonProps {
    text: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
    return (
        <div className="button" onClick={onClick}>
            <span className="button__icon">
                <AddIcon />
            </span>
            <span className="button__text">{text}</span>
        </div>
    );
};

export default Button;
