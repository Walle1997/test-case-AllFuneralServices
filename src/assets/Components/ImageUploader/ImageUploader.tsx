import React, { useCallback } from 'react';

import './ImageUploader.scss';
import Button from '../Button';
import { SetState } from '../../types';

export interface ImageUploaderProps {
    onBeforeUpload?: () => void;
    setImage: SetState<File | undefined>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
    onBeforeUpload,
    setImage
}) => {
    const hiddenFileInput = React.useRef<HTMLInputElement>(null);

    const onButtonClick = useCallback(() => {
        hiddenFileInput.current?.click();
    }, []);

    const onFileInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const uploadedFile = event.target.files?.[0];
            if (uploadedFile) {
                setImage(uploadedFile);
                if (onBeforeUpload) onBeforeUpload();
            }
        },
        [onBeforeUpload, setImage]
    );

    return (
        <div className="image-uploader">
            <input
                ref={hiddenFileInput}
                type="file"
                onChange={onFileInputChange}
            />
            <Button text="ДОБАВИТЬ ИЗОБРАЖЕНИЕ" onClick={onButtonClick} />
        </div>
    );
};

export default ImageUploader;
