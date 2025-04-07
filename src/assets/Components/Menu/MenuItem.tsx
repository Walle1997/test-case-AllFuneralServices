import React from 'react';
import clsx from 'clsx';

interface MenuItemProps {
    active?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ children, active }) => {
    return (
        <div className={clsx('menu__item', active && 'menu__item_active')}>
            {children}
        </div>
    );
};

export default MenuItem;
