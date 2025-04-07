import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Menu from './Menu';

it('checks onExit prop', () => {
    const onExit = jest.fn();
    const { getByTestId } = render(<Menu onExit={onExit} />);
    const exitIcon = getByTestId('exit-icon');
    userEvent.click(exitIcon);
    expect(onExit).toHaveBeenCalledTimes(1);
});
