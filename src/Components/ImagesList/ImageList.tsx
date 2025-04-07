import React, { useCallback, useState } from 'react';
import clsx from 'clsx';

import './ImagesList.scss';
import { ImageInfo } from '../../types';
import Image from './Image';

interface ImagesListProps {
    images: ImageInfo[];
    onCloseClick: (imageName: ImageInfo['name']) => () => void;
}

const ImagesList: React.FC<ImagesListProps> = ({ images, onCloseClick }) => {
    const [fullscreenImage, setFullscreenImage] = useState('');

    const openOnFullScreen = useCallback(
        (imagePath: ImageInfo['filepath']) => () => {
            setFullscreenImage(imagePath);
        },
        []
    );

    const exitFromFullScreen = () => setFullscreenImage('');

    return (
        <div className="images-list">
            {images.map(image => (
                <Image
                    key={image.filepath}
                    image={image}
                    onRemove={onCloseClick(image.name)}
                    onClick={openOnFullScreen}
                />
            ))}
            <div
                className={clsx(
                    'images-list__fullscreen',
                    fullscreenImage && 'images-list__fullscreen_show'
                )}
                onClick={exitFromFullScreen}>
                <img src={fullscreenImage} alt="Fullscreen Image" />
            </div>
        </div>
    );
};

export default ImagesList;
