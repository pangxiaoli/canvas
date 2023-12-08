import classNames from 'classnames';
import React, { HTMLAttributes, useEffect } from 'react';
import './style.less';
import { renderBg } from './utils/renderBg';
import { TSize } from '../useCanvas/utils/type';
import { useDispatch } from 'react-redux';
import { setIntervals } from '@/store/draw';

export type IBaseCanvasProps = HTMLAttributes<HTMLElement> & {
    canvasref: React.RefObject<HTMLCanvasElement>;
    size: TSize;
};

const BaseCanvas: React.FC<IBaseCanvasProps> = ({ className, canvasref, size, ...resetProps }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const canvas = canvasref.current;

        if (!canvas) {
            return;
        }

        const { intervals } = renderBg(canvas, size);
        dispatch(setIntervals(intervals));
    }, [canvasref, dispatch, size]);

    return (
        <canvas
            ref={canvasref}
            className={classNames('home_page--basecanvas', className)}
            {...resetProps}
        ></canvas>
    );
};

export default BaseCanvas;
