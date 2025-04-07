import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Image from './Image';

const testImage = {
    name: '1.jpg',
    filepath: '/1.jpg',
    thumbpath: '/preview/1.jpg'
};

it('renders correctly', () => {
    const onRemove = jest.fn();
    const onClick = jest.fn();
    const element = renderer
        .create(
            <Image image={testImage} onRemove={onRemove} onClick={onClick} />
        )
        .toJSON();
    expect(element).toMatchSnapshot();
});

it('checks props', () => {
    const onRemove = jest.fn();
    const onClick = jest.fn();
    render(<Image image={testImage} onRemove={onRemove} onClick={onClick} />);
    const image = screen.getByAltText(testImage.name);
    userEvent.click(image);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(testImage.filepath);
    const closeIcon = screen.getByTestId('close-icon');
    userEvent.click(closeIcon);
    expect(onRemove).toHaveBeenCalledTimes(1);
});
