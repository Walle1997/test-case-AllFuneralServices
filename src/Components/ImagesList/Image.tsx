import React from 'react';

import { ImageInfo } from '../../types';
import IconButton from '../IconButton';
import { CloseIcon } from '../icons';

interface ImageProps {
    image: ImageInfo;
    onRemove: () => void;
    onClick: (imagePath: ImageInfo['filepath']) => () => void;
}

const Image: React.FC<ImageProps> = ({
    image: { name, filepath, thumbpath },
    onRemove,
    onClick
}) => {
    return (
        <div className="images-list__item image">
            <div className="image__view">
                <img src={thumbpath} alt={name} onClick={onClick(filepath)} />
                <div className="image__remove">
                    <IconButton Icon={CloseIcon} onClick={onRemove} />
                </div>
            </div>
            <div className="image__info">
                <div className="image__name">{name}</div>
                <div className="image__date">11 июня 2018</div>
            </div>
        </div>
    );
};

export default React.memo(Image);