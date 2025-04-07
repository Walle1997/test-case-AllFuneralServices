import React, { useCallback } from 'react';

import './InputField.scss';

export interface CommonInputProps {
    type?: 'text' | 'password' | 'date';
    placeholder?: string;
}

interface ControlledInputFieldProps extends CommonInputProps {
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onEnter?: () => void;
}

const InputField: React.FC<ControlledInputFieldProps> = ({
    value,
    placeholder,
    type = 'text',
    onChange,
    onEnter
}) => {
    const onKeyDown = useCallback(
        (event: React.KeyboardEvent) => {
            if (onEnter && (event.key || event.code) === 'Enter') onEnter();
        },
        [onEnter]
    );

    return (
        <div className="input-field">
            <input
                className="input-field__input"
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
            <span className="input-field__label">{placeholder}</span>
        </div>
    );
};

export default React.memo(InputField);
