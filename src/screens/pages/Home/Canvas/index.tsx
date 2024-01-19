import classNames from 'classnames';
import React from 'react';
import './style.less';
import { Stage, StageProps } from 'react-konva';
import { getSize } from '@/store/draw/selectors';
import { useSelector, shallowEqual } from 'react-redux';
import BgLayer from './BgLayer';
import FgLayer from './FgLayer';

export type ICanvasProps = StageProps;

const Canvas: React.FC<ICanvasProps> = ({ className, ...resetProps }) => {
    const size = useSelector(getSize, shallowEqual);

    return (
        <Stage
            width={size.domW}
            height={size.domH}
            className={classNames('home_page--canvas', className)}
            {...resetProps}
        >
            <BgLayer></BgLayer>
            <FgLayer></FgLayer>
        </Stage>
    );
};

export default Canvas;
