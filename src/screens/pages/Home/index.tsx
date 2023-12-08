import classNames from 'classnames';
import React, { HTMLAttributes, createContext, useRef } from 'react';
import './style.less';
import BaseCanvas from './BaseCanvas';
import ForeCanvas from './ForeCanvas';
import calcCanvas from './useCanvas/utils';
import Toolbar from './Toolbar';
import HelperCanvas from './HelperCanvas';
import { shallowEqual, useSelector } from 'react-redux';
import { getBaseData } from '@/store/draw/selectors';

export type IHomeProps = HTMLAttributes<HTMLElement>;

export const CanvasRefsContext = createContext<{
    fgRef: React.RefObject<HTMLCanvasElement> | null;
    helperRef: React.RefObject<HTMLCanvasElement> | null;
    bgRef: React.RefObject<HTMLCanvasElement> | null;
}>({
    fgRef: null,
    helperRef: null,
    bgRef: null,
});

const Home: React.FC<IHomeProps> = ({ className, ...resetProps }) => {
    const data = useSelector(getBaseData, shallowEqual);

    const fgRef = useRef<HTMLCanvasElement>(null);
    const helperRef = useRef<HTMLCanvasElement>(null);
    const bgRef = useRef<HTMLCanvasElement>(null);

    const size = calcCanvas(data);

    return (
        <div className={classNames('home_page', className)} {...resetProps}>
            <Toolbar className='home_page--header'></Toolbar>
            <div className='home_page--canvas'>
                <CanvasRefsContext.Provider value={{ fgRef, helperRef, bgRef }}>
                    <ForeCanvas className='canvas_fg' canvasref={fgRef} size={size} />
                    <HelperCanvas className='canvas_helper' canvasref={helperRef} size={size} />
                    <BaseCanvas className='canvas_bg' canvasref={bgRef} size={size} />
                </CanvasRefsContext.Provider>
            </div>
        </div>
    );
};

export default Home;
