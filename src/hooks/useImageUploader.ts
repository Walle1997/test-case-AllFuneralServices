import { useCallback, useState } from 'react';

import { useAddImageMutation } from '../store/apiSlice';
import { CompanyId, ImageInfo, SetState } from '../types';

type ImageFile = File | undefined;

export interface UseImageUploaderProps {
    image: ImageFile;
    uploadedImage?: ImageInfo;
    setImage: SetState<ImageFile>;
    onUploadImage: () => void;
}

const useImageUploader = (companyId: CompanyId): UseImageUploaderProps => {
    const [image, setImage] = useState<File>();

    const [uploadImage, { data: uploadedImage }] = useAddImageMutation();

    const onUploadImage = useCallback(() => {
        if (!image) return;

        const multiFormData = new FormData();
        multiFormData.append('file', image);
        uploadImage({ companyId, image: multiFormData });
    }, [companyId, image, uploadImage]);

    return { image, uploadedImage, setImage, onUploadImage };
};

export default useImageUploader;