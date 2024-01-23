import React, { useRef } from 'react';
import { Layer, Line, Rect } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getSize } from '@/store/draw/selectors';
import useDraw from './hooks/useDraw';
import usePoint from './hooks/usePoint';
import { createPlan } from '@/store/draw/actions';
import Paths from './Paths';

const FgLayer: React.FC = () => {
    const dispatch = useDispatch();

    const size = useSelector(getSize, shallowEqual);

    const isDone = useRef<boolean>(false);
    const draw = useDraw();
    const point = usePoint();

    const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
        const stage = e.target.getStage();
        const _point = stage?.getPointerPosition();

        if (e.evt.button === 0 && _point) {
            isDone.current = true;
            draw.addLine(_point.x, _point.y);
        }
    };
    const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
        const stage = e.target.getStage();
        const _point = stage?.getPointerPosition();

        if (isDone.current && _point) {
            draw.pushPoint(_point.x, _point.y);
        }
    };
    const handleMouseUp = () => {
        isDone.current = false;
    };
    const handleContentMenu = (e: KonvaEventObject<MouseEvent>) => {
        e.evt.preventDefault();
        dispatch(createPlan(draw.lines));
        draw.clearLine();
    };
    const handleMouseLeave = () => {
        isDone.current = false;
    };

    const renderLine = () => {
        return draw.lines.map((i, index) => {
            const start = point.getPos(i.startTime.h, i.startTime.m, i.center.track.id);
            const end = point.getPos(i.endTiem.h, i.endTiem.m, i.center.track.id);

            return (
                <Line
                    key={'line' + index}
                    points={[start.x, start.y, end.x, end.y]}
                    stroke='blue'
                    strokeWidth={6}
                    lineCap='round'
                    lineJoin='round'
                    globalCompositeOperation={'source-over'}
                />
            );
        });
    };

    return (
        <Layer listening={true}>
            <Rect
                x={size.padding + size.captionW[0] + size.captionW[1]}
                y={size.padding + size.titleH + (size.rawH * 3) / 2}
                height={size.tableH - (size.rawH * 5) / 2}
                width={size.tableW - size.captionW[0] - size.captionW[1]}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onContextMenu={handleContentMenu}
                onMouseLeave={handleMouseLeave}
            />
            {renderLine()}
            <Paths></Paths>
        </Layer>
    );
};

export default FgLayer;
