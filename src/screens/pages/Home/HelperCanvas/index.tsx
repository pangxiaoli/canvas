import classNames from 'classnames';
import React, { HTMLAttributes, useEffect } from 'react';
import './style.less';
import { TSize } from '../useCanvas/utils/type';

export type IHelperCanvasProps = HTMLAttributes<HTMLElement> & {
    canvasref: React.RefObject<HTMLCanvasElement>;
    size: TSize;
};

const HelperCanvas: React.FC<IHelperCanvasProps> = ({
    className,
    canvasref,
    size,
    ...resetProps
}) => {
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
    }, [canvasref, size]);

    return (
        <canvas
            ref={canvasref}
            className={classNames('home_page--helpercanvas', className)}
            {...resetProps}
        ></canvas>
    );
};

export default HelperCanvas;
