import classNames from 'classnames';
import React, { createContext } from 'react';
import './style.less';
import { Stage, StageProps } from 'react-konva';
import { getBaseData } from '@/store/draw/selectors';
import { useSelector, shallowEqual } from 'react-redux';
import calcCanvas from '../utils';
import BgLayer from './BgLayer';
import FgLayer from './FgLayer';
import { TSize } from '../utils/type';

export type ICanvasProps = StageProps;

export const SizeCtx = createContext<TSize>({
    titleH: 0,
    rawH: 0,
    colW: 0,
    colNum: 0,
    tableH: 0,
    tableW: 0,
    domH: 0,
    domW: 0,
    padding: 0,
    captionW: [],
    data: {
        date: '',
        class: '0',
        group: '',
        admin: '',
        yards: [],
        transferTime: [],
    },
});

const Canvas: React.FC<ICanvasProps> = ({ className, ...resetProps }) => {
    const data = useSelector(getBaseData, shallowEqual);
    const size = calcCanvas(data);

    return (
        <Stage
            width={size.domW}
            height={size.domH}
            className={classNames('home_page--canvas', className)}
            {...resetProps}
        >
            <SizeCtx.Provider value={size}>
                <BgLayer></BgLayer>
                <FgLayer></FgLayer>
            </SizeCtx.Provider>
        </Stage>
    );
};

export default Canvas;
