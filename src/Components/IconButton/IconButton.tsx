import React from 'react';

import './IconButton.scss';

interface IconButtonProps {
    Icon: React.FC;
    onClick: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ Icon, onClick }) => {
    return (
        <span className="icon-button" onClick={onClick}>
            <Icon />
        </span>
    );
};

export default IconButton;
