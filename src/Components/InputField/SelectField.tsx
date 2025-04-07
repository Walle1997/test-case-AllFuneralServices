import React from 'react';
import Select, { SingleValue, MultiValue } from 'react-select';
import makeAnimated from 'react-select/animated';

import { ClassNameProps } from '../../types';

const animatedComponents = makeAnimated();

export type SelectOption = { value: string; label: string };

export type SelectValue = SingleValue<SelectOption> | MultiValue<SelectOption>;

interface SelectFieldProps extends ClassNameProps {
    value: SelectValue;
    options: SelectOption[];
    isMulti?: boolean;
    onChange: (value: SelectValue) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
    options,
    value,
    isMulti = false,
    onChange
}) => {
    return (
        <div className="input-field">
            <Select<SelectOption, typeof isMulti>
                className="input-field__input input-field__select"
                closeMenuOnSelect={!isMulti}
                components={animatedComponents}
                isMulti={isMulti}
                value={value}
                options={options}
                onChange={onChange}
                noOptionsMessage={() => 'Нет доступных значений'}
            />
        </div>
    );
};

export default React.memo(SelectField);
