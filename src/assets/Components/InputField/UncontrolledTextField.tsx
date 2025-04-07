import React from 'react';

import { CommonInputProps } from './InputField';

interface UncontrolledTextFieldProps extends CommonInputProps {
    ref?: React.ForwardedRef<HTMLInputElement>;
}

const UncontrolledTextField: React.FC<UncontrolledTextFieldProps> = React.forwardRef(
    ({ placeholder, type = 'text' }, ref) => {
        return (
            <div className="input-field">
                <input
                    ref={ref}
                    className="input-field__input"
                    type={type}
                    placeholder={placeholder}
                />
                <span className="input-field__label">{placeholder}</span>
            </div>
        );
    }
);

UncontrolledTextField.displayName = 'UncontrolledTextField';

export default React.memo(UncontrolledTextField);
