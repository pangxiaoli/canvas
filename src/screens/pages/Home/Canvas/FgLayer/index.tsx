import React, { ReactNode, useRef } from 'react';
import { Layer, Line, Rect } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getPath, getSize } from '@/store/draw/selectors';
import useDraw from './hooks/useDraw';
import usePoint from './hooks/usePoint';
import { createPlan } from '@/store/draw/actions';

const FgLayer: React.FC = () => {
    const dispatch = useDispatch();

    const size = useSelector(getSize, shallowEqual);
    const path = useSelector(getPath, shallowEqual);

    const isDone = useRef<boolean>(false);
    const draw = useDraw();
    const point = usePoint();

    const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
        const stage = e.target.getStage();
        const point = stage?.getPointerPosition();

        if (e.evt.button === 0 && point) {
            isDone.current = true;
            draw.addLine(point.x, point.y);
        }
    };
    const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
        const stage = e.target.getStage();
        const point = stage?.getPointerPosition();

        if (isDone.current && point) {
            draw.pushPoint(point.x, point.y);
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

    const renderPath = () => {
        const _path: ReactNode[] = [];

        for (let i = 0; i < path.length; i++) {
            for (let j = 0; j < path[i].scheme.length; j++) {
                const ele = path[i].scheme[j];

                const start = point.getPos(ele.startTime.h, ele.startTime.m, ele.center.track.id);
                const end = point.getPos(ele.endTiem.h, ele.endTiem.m, ele.center.track.id);

                _path.push(
                    <Line
                        key={'path' + i + j}
                        points={[start.x, start.y, end.x, end.y]}
                        stroke='blue'
                        strokeWidth={8}
                        globalCompositeOperation={'source-over'}
                    />,
                );

                /**
                 * 起始、两段之间的连线、结束
                 */
                if (j === 0) {
                    _path.push(
                        <Line
                            key={'start' + i + j}
                            points={[
                                start.x,
                                size.padding + size.titleH + size.rawH,
                                start.x,
                                start.y,
                            ]}
                            stroke='#4b63b2'
                            strokeWidth={1}
                            globalCompositeOperation={'source-over'}
                        />,
                    );
                }
                if (j < path[i].scheme.length - 1) {
                    const next = path[i].scheme[j + 1];
                    const nextStart = point.getPos(
                        next.startTime.h,
                        next.startTime.m,
                        next.center.track.id,
                    );

                    _path.push(
                        <Line
                            key={'subs' + i + j}
                            points={[end.x, end.y, nextStart.x, nextStart.y]}
                            stroke='#d9d9d9'
                            strokeWidth={1}
                            globalCompositeOperation={'source-over'}
                        />,
                    );
                }
                if (j === path[i].scheme.length - 1) {
                    _path.push(
                        <Line
                            key={'end' + i + j}
                            points={[
                                end.x,
                                size.padding + size.titleH + size.tableH - size.rawH / 2,
                                end.x,
                                end.y,
                            ]}
                            stroke='red'
                            strokeWidth={1}
                            globalCompositeOperation={'source-over'}
                        />,
                    );
                }
            }
        }

        return _path;
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
            {renderPath()}
        </Layer>
    );
};

export default FgLayer;
