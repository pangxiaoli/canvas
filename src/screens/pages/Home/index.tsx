import classNames from 'classnames';
import React, { HTMLAttributes } from 'react';
import './style.less';
import Toolbar from './Toolbar';
import Canvas from './Canvas';

export type IHomeProps = HTMLAttributes<HTMLElement>;

const Home: React.FC<IHomeProps> = ({ className, ...resetProps }) => {
    return (
        <div className={classNames('home_page', className)} {...resetProps}>
            <Toolbar className='home_page--header'></Toolbar>
            <Canvas className='home_page--content'></Canvas>
        </div>
    );
};

export default Home;
