import { useCallback, useState } from 'react';

import { SetState, StringObject } from '../types';

interface UseEditableNodeResult<T> {
    editMode: boolean;
    toggleEditMode: SetState<boolean>;
    onChange: (
        property: T,
        rootObject?: StringObject,
        nestedProperty?: string
    ) => (value: string) => void;
}

const useEditableNode = <T = string>(
    onEdit: (property: T, value: string | StringObject) => void
): UseEditableNodeResult<T> => {
    const [editMode, toggleEditMode] = useState(false);

    const onChange = useCallback(
        (property: T, rootObject?: StringObject, nestedProperty?: string) => (
            value: string
        ) => {
            if (rootObject && nestedProperty) {
                onEdit(property, {
                    ...rootObject,
                    [nestedProperty]: value
                });
            } else {
                onEdit(property, value);
            }
            toggleEditMode(false);
        },
        [onEdit]
    );

    return { editMode, toggleEditMode, onChange };
};

export default useEditableNode;
