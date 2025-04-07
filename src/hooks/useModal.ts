import { useCallback, useState } from 'react';

interface UseModalResult {
    isModalOpen: boolean;
    closeModal: () => void;
    openModal: () => void;
}

const useModal = (): UseModalResult => {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = useCallback(() => setIsOpen(false), []);

    const openModal = useCallback(() => setIsOpen(true), []);

    return { isModalOpen: isOpen, closeModal, openModal };
};

export default useModal;
