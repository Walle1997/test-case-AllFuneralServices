import React from 'react';

import IconButton from '../IconButton';
import { CloseIcon, EditIcon } from '../icons';

interface EditableTogglerProps {
    editMode: boolean;
    toggleEditMode: (editMode: boolean) => void;
}

const EditableToggler: React.FC<EditableTogglerProps> = ({
    editMode,
    toggleEditMode
}) => {
    return editMode ? (
        <IconButton Icon={CloseIcon} onClick={() => toggleEditMode(false)} />
    ) : (
        <IconButton Icon={EditIcon} onClick={() => toggleEditMode(true)} />
    );
};

export default React.memo(EditableToggler);
