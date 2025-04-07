import React, { useMemo } from 'react';

import Records, { Record } from '../Records';
import Section from '../Section';
import { ContactsProperties, StringObject, UpdatedContacts } from '../../types';
import { emailView, phoneView } from '../../utils';
import { EditableNode, EditableToggler } from '../EditableNode';
import useEditableNode from '../../hooks/useEditableNode';

interface ContactsSectionProps {
    contacts: UpdatedContacts;
    onEdit: (
        property: ContactsProperties,
        value: string | StringObject
    ) => void;
}

const ContactsSection: React.FC<ContactsSectionProps> = ({
    contacts,
    onEdit
}) => {
    const { editMode, toggleEditMode, onChange } = useEditableNode<
        ContactsProperties
    >(onEdit);

    const onChangeFirstName = useMemo(() => onChange('firstname'), [onChange]);
    const onChangeLastName = useMemo(() => onChange('lastname'), [onChange]);
    const onChangePatronymic = useMemo(() => onChange('patronymic'), [
        onChange
    ]);

    const onChangePhone = useMemo(() => onChange('phone'), [onChange]);

    const onChangeEmail = useMemo(() => onChange('email'), [onChange]);

    return (
        <Section
            className="organization__section"
            title={
                <>
                    Контактные данные
                    <EditableToggler
                        editMode={editMode}
                        toggleEditMode={toggleEditMode}
                    />
                </>
            }>
            <Records>
                <Record key="fio" name="ФИО">
                    <EditableNode
                        value={contacts.lastname}
                        editMode={editMode}
                        changeValue={onChangeLastName}
                    />{' '}
                    <EditableNode
                        value={contacts.firstname}
                        editMode={editMode}
                        changeValue={onChangeFirstName}
                    />{' '}
                    <EditableNode
                        value={contacts.patronymic}
                        editMode={editMode}
                        changeValue={onChangePatronymic}
                    />
                </Record>
                <Record key="phone" name="Телефон">
                    <EditableNode
                        value={contacts.phone}
                        editMode={editMode}
                        viewerFn={phoneView}
                        changeValue={onChangePhone}
                    />
                </Record>
                <Record key="email" name="Эл. почта">
                    <EditableNode
                        value={contacts.email}
                        editMode={editMode}
                        viewerFn={emailView}
                        changeValue={onChangeEmail}
                    />
                </Record>
            </Records>
        </Section>
    );
};

export default React.memo(ContactsSection);
