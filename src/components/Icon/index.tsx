import classNames from 'classnames';
import React, { HTMLAttributes } from 'react';
import './style.less';

export type IIconProps = HTMLAttributes<HTMLElement>;

const Icon: React.FC<IIconProps> = ({ className, ...resetProps }) => {
    return <i className={classNames('icon_com', className)} {...resetProps}></i>;
};

export default Icon;
