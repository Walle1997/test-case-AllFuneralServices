import React from 'react';

import ModalWindow from '../components/ModalWindow';
import useModal from '../hooks/useModal';
import ImagesSection from '../components/Organization/ImagesSection';
import useImages from '../hooks/useImages';

const ImagesContainer: React.FC = () => {
    const { isModalOpen, closeModal, openModal } = useModal();

    const {
        image,
        imagesList,
        setImage,
        onUploadImage,
        deleteImageByName
    } = useImages();

    return (
        <>
            <ImagesSection
                images={imagesList}
                onBeforeUpload={openModal}
                setImage={setImage}
                deleteImageByName={deleteImageByName}
            />
            <ModalWindow
                show={isModalOpen}
                title="Загрузить изображение на сайт"
                secondButton="Загрузить"
                onClose={closeModal}
                onAccept={onUploadImage}>
                {image && (
                    <img
                        className="image-uploader__preview"
                        alt="image preview"
                        src={URL.createObjectURL(image)}
                    />
                )}
            </ModalWindow>
        </>
    );
};

export default ImagesContainer;
