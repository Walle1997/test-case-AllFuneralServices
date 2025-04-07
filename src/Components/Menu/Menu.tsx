import React from 'react';
import clsx from 'clsx';

import './Menu.scss';
import { ClassNameProps } from '../../types';
import {
    ChatIcon,
    ExitIcon,
    HomeIcon,
    MarketIcon,
    SearchIcon,
    SettingsIcon
} from '../icons';
import MenuItem from './MenuItem';
import IconButton from '../IconButton';

interface MenuProps extends ClassNameProps {
    onExit: () => void;
}

const Menu: React.FC<MenuProps> = ({ className, onExit }) => {
    return (
        <div className={clsx('menu', className)}>
            <div className="menu__upper">
                <MenuItem>
                    <HomeIcon />
                </MenuItem>
                <MenuItem active={true}>
                    <MarketIcon />
                </MenuItem>
                <MenuItem>
                    <SearchIcon />
                </MenuItem>
            </div>

            <div className="menu__lower">
                <MenuItem>
                    <SettingsIcon />
                </MenuItem>
                <MenuItem>
                    <ChatIcon />
                </MenuItem>
                <MenuItem>
                    <IconButton Icon={ExitIcon} onClick={onExit} />
                </MenuItem>
            </div>
        </div>
    );
};

export default Menu;
