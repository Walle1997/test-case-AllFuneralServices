import React, { useCallback } from 'react';
import clsx from 'clsx';

import './Organization.scss';
import {
    ClassNameProps,
    Company,
    CompanyProperties,
    StringObject
} from '../../types';
import { BackIcon, DeleteIcon, LinkedIcon, RotationIcon } from '../icons';
import { ContactsSection, ImagesSection } from '../../containers';
import { phoneView } from '../../utils';
import IconButton from '../IconButton';
import SummarySection from './SummarySection';
import { EditableNode, EditableToggler } from '../EditableNode';
import useEditableNode from '../../hooks/useEditableNode';
import ModalWindow from '../ModalWindow';
import useModal from '../../hooks/useModal';

interface OrganizationProps extends ClassNameProps {
    company: Company;
    onUpdate: () => void;
    onEdit: (property: CompanyProperties, value: string | StringObject) => void;
    onDelete: () => void;
    goBack: () => void;
}

const Organization: React.FC<OrganizationProps> = ({
    className,
    company,
    onUpdate,
    onEdit,
    onDelete,
    goBack
}) => {
    const { isModalOpen, closeModal, openModal } = useModal();
    const {
        editMode: nameEditMode,
        toggleEditMode: toggleNameEditMode,
        onChange
    } = useEditableNode<CompanyProperties>(onEdit);

    const onDeleteCompany = useCallback(() => {
        onDelete();
    }, [onDelete]);

    return (
        <div className={clsx('organization', className)}>
            <div className="organization__header header">
                <div className="header__link" onClick={goBack}>
                    <BackIcon />К списку юридических лиц
                </div>
                <div className="header__buttons">
                    <LinkedIcon />
                    <IconButton Icon={RotationIcon} onClick={onUpdate} />
                    <IconButton Icon={DeleteIcon} onClick={openModal} />
                </div>
            </div>

            <div className="organization__content">
                <div className="organization__title">
                    <EditableNode
                        value={company.shortName}
                        editMode={nameEditMode}
                        changeValue={onChange('shortName')}
                    />
                    <EditableToggler
                        editMode={nameEditMode}
                        toggleEditMode={toggleNameEditMode}
                    />
                </div>

                <SummarySection company={company} onEdit={onEdit} />

                <ContactsSection contactId={company.contactId} />

                <ImagesSection />

                <div className="organization__footer footer">
                    <div className="footer__copyright">
                        © 1992 - 2020 Честный Агент © Все права защищены.
                    </div>
                    <div className="footer__phone">
                        {phoneView('84951502112')}
                    </div>
                </div>
            </div>
            <ModalWindow
                show={isModalOpen}
                title="Удалить карточку"
                secondButton="Удалить"
                onClose={closeModal}
                onAccept={onDeleteCompany}>
                Отправить карточку организации в архив?
            </ModalWindow>
        </div>
    );
};

export default Organization;
