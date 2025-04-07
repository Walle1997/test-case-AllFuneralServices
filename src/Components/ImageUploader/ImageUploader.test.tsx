import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ImageUploader from './ImageUploader';

it('renders correctly', () => {
    const setImage = jest.fn();
    const element = renderer
        .create(<ImageUploader setImage={setImage} />)
        .toJSON();
    expect(element).toMatchSnapshot();
});

it('upload file', () => {
    const file = new File(['test'], 'test.png', { type: 'image/png' });

    const setImage = jest.fn();
    const onBeforeUpload = jest.fn();
    const { container } = render(
        <ImageUploader setImage={setImage} onBeforeUpload={onBeforeUpload} />
    );
    const fileInput = container.querySelector(
        'input[type="file"]'
    ) as HTMLInputElement;
    expect(fileInput).toBeInTheDocument();

    if (fileInput) {
        userEvent.upload(fileInput, file);
        expect(fileInput.files).toHaveLength(1);
        expect(fileInput.files?.[0]).toStrictEqual(file);
        expect(fileInput.files?.item(0)).toStrictEqual(file);

        expect(onBeforeUpload).toHaveBeenCalledTimes(1);

        expect(setImage).toHaveBeenCalledTimes(1);
        expect(setImage).toHaveBeenCalledWith(file);
    }
});
