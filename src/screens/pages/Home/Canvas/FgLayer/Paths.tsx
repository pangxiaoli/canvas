import { dragScheme, updateSchemeTime } from '@/store/draw/actions';
import { getSize, getPath } from '@/store/draw/selectors';
import { ReactNode } from 'react';
import { Line } from 'react-konva';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import TransformableLine from './TransformableLine';
import usePoint from './hooks/usePoint';

const Paths = () => {
    const dispatch = useDispatch();

    const size = useSelector(getSize, shallowEqual);
    const path = useSelector(getPath, shallowEqual);

    const point = usePoint();

    const _path: ReactNode[] = [];

    for (let i = 0; i < path.length; i++) {
        for (let j = 0; j < path[i].scheme.length; j++) {
            const ele = path[i].scheme[j];

            const start = point.getPos(ele.startTime.h, ele.startTime.m, ele.center.track.id);
            const end = point.getPos(ele.endTiem.h, ele.endTiem.m, ele.center.track.id);

            _path.push(
                <TransformableLine
                    key={'path' + i + j}
                    x={0}
                    y={0}
                    points={[start.x, start.y, end.x, end.y]}
                    stroke={'blue'}
                    strokeWidth={8}
                    globalCompositeOperation={'source-over'}
                    closed
                    onDragEnd={y => {
                        dispatch(
                            dragScheme({
                                id: path[i].id,
                                schemeIndex: j,
                                center: point.getPoint(start.x, start.y + y).center as any,
                            }),
                        );
                    }}
                    onTransformEnd={(startTime, endTime) => {
                        dispatch(
                            updateSchemeTime({
                                id: path[i].id,
                                schemeIndex: j,
                                startTime,
                                endTime,
                            }),
                        );
                    }}
                />,
            );

            /**
             * 起始、两段之间的连线、结束
             */
            if (j === 0) {
                _path.push(
                    <Line
                        key={'start' + i + j}
                        points={[start.x, size.padding + size.titleH + size.rawH, start.x, start.y]}
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

export default Paths;
