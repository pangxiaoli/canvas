import { Layer, Line, Rect, Text } from 'react-konva';
import React, { useContext } from 'react';
import { TInserval } from '@/store/draw/initialState/type';
import { useDispatch } from 'react-redux';
import { setIntervals } from '@/store/draw';
import { SizeCtx } from '..';

const BgLayer: React.FC = () => {
    const dispatch = useDispatch();
    const size = useContext(SizeCtx);
    const timeStart = size.data.class === '0' ? 6 : 20;

    // 股道
    const renderTrack = () => {
        /** 股道坐标 */
        const intervals: TInserval[] = [];

        const tracks: any = [];

        const [x0, y0] = [size.padding, size.padding + size.titleH + size.rawH / 2];
        let dh = 0;

        size.data.yards.forEach((i, idx) => {
            i.tracks.forEach((j, jdx) => {
                tracks.push(
                    <Text
                        key={'t' + idx + jdx}
                        text={j.name}
                        x={x0 + size.captionW[0] + 5}
                        y={y0 + size.rawH / 2 + dh - 5}
                        fill='blue'
                        fontSize={14}
                    />,
                    <Line
                        key={'b' + idx + jdx}
                        points={[
                            x0 + size.captionW[0] + size.captionW[1],
                            y0 + size.rawH / 2 + dh,
                            x0 + size.tableW,
                            y0 + size.rawH / 2 + dh,
                        ]}
                        stroke={'black'}
                        strokeWidth={1}
                    />,
                    <Line
                        key={'s' + idx + jdx}
                        points={[
                            x0 + size.captionW[0],
                            y0 + size.rawH + dh,
                            x0 + size.tableW,
                            y0 + size.rawH + dh,
                        ]}
                        stroke={'#008000'}
                        strokeWidth={1}
                    />,
                );

                intervals.push({
                    start: y0 + dh,
                    end: y0 + size.rawH + dh,
                    center: y0 + size.rawH / 2 + dh,
                    track: {
                        id: j.id,
                        name: j.name,
                    },
                    yard: i.name,
                });

                dh += size.rawH;
            });

            tracks.push(
                <Text
                    key={'t' + idx}
                    text={i.name.split('').join('\n')}
                    x={x0 + 10}
                    y={y0 + dh - (i.tracks.length * size.rawH) / 2 - i.name.length * 5}
                    fill='black'
                    fontSize={14}
                    fontStyle='bold'
                />,
                <Line
                    key={'l' + idx}
                    points={[x0, y0 + dh, x0 + size.tableW, y0 + dh]}
                    stroke={'#008000'}
                    strokeWidth={1}
                />,
            );
        });

        dispatch(setIntervals(intervals));

        return tracks;
    };

    //列
    const renderCol = () => {
        const cols: any = [];
        const [x0, y0] = [size.padding, size.padding + size.titleH];

        Array(size.colNum + 2)
            .fill(1)
            .forEach((_, index) => {
                cols.push(
                    <Line
                        key={index}
                        points={[
                            x0 +
                                (size.captionW[index]
                                    ? size.captionW.slice(0, index + 1).reduce((a, b) => a + b, 0)
                                    : size.captionW.reduce((a, b) => a + b, 0) +
                                      (index - 1) * size.colW),
                            y0,
                            x0 +
                                (size.captionW[index]
                                    ? size.captionW.slice(0, index + 1).reduce((a, b) => a + b, 0)
                                    : size.captionW.reduce((a, b) => a + b, 0) +
                                      (index - 1) * size.colW),
                            y0 + size.tableH,
                        ]}
                        stroke={'#008000'}
                        strokeWidth={1}
                    />,
                );

                if (index > 0) {
                    cols.push(
                        <Text
                            key={'ct' + index}
                            x={
                                x0 +
                                size.captionW.reduce((a, b) => a + b, 0) +
                                (index - 1) * size.colW -
                                20
                            }
                            y={y0 - 15}
                            fill='black'
                            fontSize={14}
                            fontStyle='bold'
                            text={((timeStart + index - 1) % 24) + ' : 00'}
                        />,
                    );
                }

                Array(5)
                    .fill(1)
                    .forEach((_, jndex) => {
                        cols.push(
                            <Line
                                key={'t' + index + jndex}
                                points={[
                                    x0 +
                                        size.captionW[0] +
                                        size.captionW[1] +
                                        index * size.colW +
                                        ((jndex + 1) * size.colW) / 6,
                                    y0 + size.rawH / 2 - 5,
                                    x0 +
                                        size.captionW[0] +
                                        size.captionW[1] +
                                        index * size.colW +
                                        ((jndex + 1) * size.colW) / 6,
                                    y0 + size.rawH / 2,
                                ]}
                                stroke={'#008000'}
                                strokeWidth={1}
                            />,
                        );
                    });
            });

        return cols;
    };

    return (
        <Layer listening={false}>
            {/* 边框 */}
            <Rect
                x={size.padding}
                y={size.padding + size.titleH}
                height={size.tableH}
                width={size.tableW}
                stroke={'#008000'}
                strokeWidth={1}
            />

            {/* 第一行 */}
            <Line
                points={[
                    size.padding,
                    size.padding + size.titleH + size.rawH / 2,
                    size.padding + size.tableW,
                    size.padding + size.titleH + size.rawH / 2,
                ]}
                stroke={'#008000'}
                strokeWidth={1}
            />

            {renderTrack()}
            {renderCol()}
        </Layer>
    );
};

export default BgLayer;
