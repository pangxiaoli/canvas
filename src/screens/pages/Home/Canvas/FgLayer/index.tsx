import React, { useContext, useRef, useState } from 'react';
import { Layer, Line, Rect } from 'react-konva';
import { SizeCtx } from '..';
import { KonvaEventObject } from 'konva/lib/Node';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getIntervals, getIsDraw, getPath, getTransferTime } from '@/store/draw/selectors';
import { findIntervalName } from '../utils/findIntervalName';
import { TLine } from '@/store/draw/initialState/type';
import { pushPath, setIsDraw } from '@/store/draw';
import useDialog from '@/hooks/useDialog';
import { Html } from 'react-konva-utils';
import TrainInfo from './TrainInfo';

const FgLayer: React.FC = () => {
    const dispatch = useDispatch();
    const size = useContext(SizeCtx);
    const isDraw = useSelector(getIsDraw, shallowEqual);
    const intervals = useSelector(getIntervals, shallowEqual);

    const { ctx, open } = useDialog(<TrainInfo data={{ lines: [] }} size={size} />);

    const path = useSelector(getPath, shallowEqual);
    const transferTime = useSelector(getTransferTime);

    const [lines, setLines] = useState<TLine[]>([]);

    const isDone = useRef<boolean>(false);

    const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
        if (isDraw && e.evt.button === 0) {
            const stage = e.target.getStage();
            const point = stage?.getPointerPosition();

            if (point) {
                isDone.current = true;

                const interval = findIntervalName(intervals, point.y);
                if (lines.length) {
                    const [trackFrom, trackTo] = [lines.at(-1)!.track.id, interval.track.id];

                    const res = transferTime.find(
                        i =>
                            (i.form === trackFrom && i.to === trackTo) ||
                            (i.form === trackTo && i.to === trackFrom),
                    );
                    if (!res) {
                        return;
                    }
                    setLines([
                        ...lines,
                        {
                            startX: lines.at(-1)!.endX + (res.time * size.colW) / 60,
                            endX: point.x,
                            center: interval.center,
                            yard: interval.yard,
                            track: interval.track,
                        },
                    ]);
                } else {
                    setLines([
                        ...lines,
                        {
                            startX: point.x,
                            endX: point.x,
                            center: interval.center,
                            yard: interval.yard,
                            track: interval.track,
                        },
                    ]);
                }
            }
        }
    };
    const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
        const stage = e.target.getStage();
        const point = stage?.getPointerPosition();

        if (point?.x && isDone.current) {
            const lastLine = lines.at(-1);
            lastLine!.endX = point.x;
            setLines([...lines.splice(0, lines.length - 1)!, lastLine!]);
        }
    };
    const handleMouseUp = () => {
        isDone.current = false;
    };
    const handleContentMenu = (e: KonvaEventObject<MouseEvent>) => {
        e.evt.preventDefault();

        dispatch(pushPath(lines));
        dispatch(setIsDraw(false));
        setLines([]);

        const stage = e.target.getStage();
        if (!stage) {
            return;
        }
        stage.container().style.cursor = 'default';
    };

    const handleMouseEnter = (e: KonvaEventObject<MouseEvent>) => {
        const stage = e.target.getStage();
        if (!stage) {
            return;
        }
        stage.container().style.cursor = isDraw ? 'crosshair' : 'default';
    };
    const handleMouseLeave = (e: KonvaEventObject<MouseEvent>) => {
        const stage = e.target.getStage();
        if (!stage) {
            return;
        }
        stage.container().style.cursor = 'default';
    };

    const renderLine = () =>
        lines.map((i, index) => (
            <Line
                key={index}
                points={[i.startX, i.center, i.endX, i.center]}
                stroke='blue'
                strokeWidth={6}
                lineCap='round'
                lineJoin='round'
                globalCompositeOperation={'source-over'}
            />
        ));

    const renderPath = () => {
        const _path: any = [];

        path.forEach((i, idx) => {
            const rLines = [];
            for (let jdx = 0; jdx < i.lines.length; jdx++) {
                const j = i.lines[jdx];

                if (jdx === 0) {
                    rLines.push([
                        j.startX,
                        size.padding + size.titleH + size.rawH,
                        j.startX,
                        j.center,
                    ]);
                } else if (jdx === i.lines.length - 1) {
                    rLines.push(
                        [i.lines[jdx - 1].endX, i.lines[jdx - 1].center, j.startX, j.center],
                        [
                            j.endX,
                            j.center,
                            j.endX,
                            size.padding + size.titleH + size.tableH - size.rawH / 2,
                        ],
                    );
                } else {
                    rLines.push([
                        i.lines[jdx - 1].endX,
                        i.lines[jdx - 1].center,
                        j.startX,
                        j.center,
                    ]);
                }

                _path.push(
                    <Line
                        key={'c' + idx + jdx}
                        points={[j.startX, j.center, j.endX, j.center]}
                        stroke='blue'
                        strokeWidth={8}
                        globalCompositeOperation={'source-over'}
                        onClick={() => {
                            open({ data: i });
                        }}
                    />,
                );
            }

            rLines.forEach((i, index) =>
                _path.push(
                    <Line
                        key={'r' + idx + index}
                        points={i}
                        stroke={
                            index === 0 ? 'blue' : index === rLines.length - 1 ? 'red' : '#d9d9d9'
                        }
                        strokeWidth={1}
                        globalCompositeOperation={'source-over'}
                    />,
                ),
            );
        });

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
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            {renderLine()}
            {renderPath()}

            <Html>{ctx}</Html>
        </Layer>
    );
};

export default FgLayer;
