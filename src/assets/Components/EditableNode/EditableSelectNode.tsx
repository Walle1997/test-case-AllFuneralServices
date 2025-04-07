import React, { useCallback, useState } from 'react';
import clsx from 'clsx';

import './EditableNode.scss';
import { SelectField, SelectOption, SelectValue } from '../InputField';
import IconButton from '../IconButton';
import { SaveIcon } from '../icons';

interface EditableNodeProps {
    value: SelectValue;
    options: SelectOption[];
    editMode: boolean;
    changeValue: (editedValue: SelectValue) => void;
    viewerFn?: (value: SelectValue) => React.ReactNode | string;
}

const EditableNode: React.FC<EditableNodeProps> = ({
    value,
    options,
    editMode,
    changeValue,
    viewerFn
}) => {
    const [editedValue, setEditedValue] = useState<SelectValue>(value);

    const onChange = useCallback((newValue: SelectValue) => {
        setEditedValue(newValue);
    }, []);

    const onSave = () => {
        changeValue(editedValue);
    };

    if (editMode)
        return (
            <div
                className={clsx(
                    'editable-node',
                    value !== editedValue && 'editable-node_changed'
                )}>
                <SelectField
                    options={options}
                    value={editedValue}
                    isMulti={true}
                    onChange={onChange}
                />
                <IconButton Icon={SaveIcon} onClick={onSave} />
            </div>
        );

    return <>{viewerFn ? viewerFn(value) : value}</>;
};

export default React.memo(EditableNode);