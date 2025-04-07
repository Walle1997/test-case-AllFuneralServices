import React from 'react';

import ImagesList from '../ImagesList';
import Section from '../Section';
import { ImageInfo } from '../../types';
import ImageUploader from '../ImageUploader';
import { ImageUploaderProps } from '../ImageUploader/ImageUploader';

interface ImagesSectionProps extends ImageUploaderProps {
    images: ImageInfo[];
    deleteImageByName: (imageName: ImageInfo['name']) => () => void;
}

const ImagesSection: React.FC<ImagesSectionProps> = ({
    images,
    onBeforeUpload,
    setImage,
    deleteImageByName
}) => {
    return (
        <Section className="organization__section" title="Приложенные фото">
            <ImagesList images={images} onCloseClick={deleteImageByName} />
            <ImageUploader
                onBeforeUpload={onBeforeUpload}
                setImage={setImage}
            />
        </Section>
    );
};

export default React.memo(ImagesSection);
