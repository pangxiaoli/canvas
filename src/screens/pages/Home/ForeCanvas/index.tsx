import classNames from 'classnames';
import React, { HTMLAttributes, useContext, useEffect } from 'react';
import './style.less';
import { TSize } from '../useCanvas/utils/type';
import { findIntervalName } from './utils/findIntervalName';
import { renderLines } from './utils/renderLines';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getIntervals, getIsDraw, getPath } from '@/store/draw/selectors';
import { pushPath, setIsDraw } from '@/store/draw';
import { CanvasRefsContext } from '..';
import renderHelp from '../HelperCanvas/utils/renderHelp';

export type IForeCanvasProps = HTMLAttributes<HTMLElement> & {
    canvasref: React.RefObject<HTMLCanvasElement>;
    size: TSize;
};

const ForeCanvas: React.FC<IForeCanvasProps> = ({ className, canvasref, size, ...resetProps }) => {
    const dispatch = useDispatch();

    const { helperRef } = useContext(CanvasRefsContext);

    const intervals = useSelector(getIntervals, shallowEqual);
    const isDraw = useSelector(getIsDraw, shallowEqual);
    const path = useSelector(getPath, shallowEqual);

    const startX = size.captionW.reduce((a, b) => a + b, 0) + size.padding;

    useEffect(() => {
        const canvas = canvasref.current;

        if (!canvas) {
            return;
        }
        canvas.style.height = size.domH + 'px';
        canvas.style.width = size.domW + 'px';

        canvas.height = size.canvasH;
        canvas.width = size.canvasW;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }

        ctx.scale(size.dpi, size.dpi);

        renderLines(ctx, path);

        let [x0, y0] = [0, 0];
        let isDown = false;

        const line = {
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0,
        };

        const onMouseDown = (e: MouseEvent) => {
            const res = findIntervalName(intervals, e.offsetY);

            if (e.button === 2) {
                console.log(e.offsetX, e.offsetY);
                console.log(path);
            } else if (e.button === 0) {
                if (isDraw && res.center > -1) {
                    [x0, y0] = [Math.max(e.offsetX, startX), res.center];
                    isDown = true;

                    line.startX = e.offsetX;
                    line.startY = res.center;
                    line.endY = res.center;
                }
            }
        };

        const onMouseMove = (e: MouseEvent) => {
            renderHelp(e, helperRef, size);
            if (isDown && isDraw) {
                ctx.beginPath();
                ctx.moveTo(x0, y0);
                ctx.strokeStyle = 'blue';
                ctx.lineWidth = 6;
                ctx.lineCap = 'round';
                ctx.lineTo(e.offsetX, y0);
                ctx.stroke();
                x0 = e.offsetX;
            }
        };

        const onMouseUp = (e: MouseEvent) => {
            if (isDown && isDraw && e.button === 0) {
                isDown = false;
                line.endX = e.offsetX;
                dispatch(pushPath(line));
            }
        };

        const onContentMenu = (e: MouseEvent) => {
            e.preventDefault();
            dispatch(setIsDraw(false));
        };

        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mousedown', onMouseDown);
        canvas.addEventListener('mouseup', onMouseUp);
        canvas.addEventListener('contextmenu', onContentMenu);

        return () => {
            canvas.removeEventListener('mousemove', onMouseMove);
            canvas.removeEventListener('mousedown', onMouseDown);
            canvas.removeEventListener('mouseup', onMouseUp);
            canvas.removeEventListener('contextmenu', onContentMenu);
        };
    }, [canvasref, dispatch, helperRef, intervals, isDraw, path, size, startX]);

    return (
        <canvas
            ref={canvasref}
            className={classNames('home_page--forecanvas', isDraw && 'drawing', className)}
            {...resetProps}
        ></canvas>
    );
};

export default ForeCanvas;
