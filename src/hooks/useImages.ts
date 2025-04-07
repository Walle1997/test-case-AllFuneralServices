import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    addImage,
    removeImage,
    selectCompanyId,
    selectCompanyImages
} from '../store/organizationSlice';
import useImageUploader, { UseImageUploaderProps } from './useImageUploader';
import { useDeleteImageMutation } from '../store/apiSlice';
import { ImageInfo } from '../types';

interface UseImagesResult extends UseImageUploaderProps {
    imagesList: ImageInfo[];
    deleteImageByName: (imageName: ImageInfo['name']) => () => void;
}

const useImages = (): UseImagesResult => {
    const companyId = useSelector(selectCompanyId);
    const imagesList = useSelector(selectCompanyImages);

    const dispatch = useDispatch();

    const { image, uploadedImage, setImage, onUploadImage } = useImageUploader(
        companyId
    );

    const [deleteImage, { isSuccess, originalArgs }] = useDeleteImageMutation();

    useEffect(() => {
        if (isSuccess && originalArgs?.imageName) {
            dispatch(removeImage(originalArgs.imageName));
        }
    }, [dispatch, isSuccess, originalArgs?.imageName]);

    const deleteImageByName = useCallback(
        (imageName: ImageInfo['name']) => () => {
            deleteImage({ companyId, imageName });
        },
        [companyId, deleteImage]
    );

    useEffect(() => {
        if (uploadedImage) {
            dispatch(addImage(uploadedImage));
        }
    }, [dispatch, uploadedImage]);

    return { image, imagesList, setImage, onUploadImage, deleteImageByName };
};

export default useImages;
