import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { LineConfig } from 'konva/lib/shapes/Line';
import React, { useEffect, useRef, useState } from 'react';
import { Line, Transformer } from 'react-konva';
import { TTime } from './hooks/type';
import usePoint from './hooks/usePoint';

export type TTransformableLine = React.FC<
    {
        onDragEnd: (y: number) => void;
        onTransformEnd: (startTime: TTime, endTiem: TTime) => void;
    } & LineConfig
>;

const TransformableLine: TTransformableLine = ({ onDragEnd, onTransformEnd, ...lineProps }) => {
    const lineRef = useRef<Konva.Line>(null);
    const trRef = useRef<Konva.Transformer>(null);
    const [isSelected, setIsSelected] = useState(false);

    const point = usePoint();

    const [key, setKey] = useState(0);
    useEffect(() => {
        setKey(p => p + 1);
    }, [lineProps.points]);

    useEffect(() => {
        if (isSelected && trRef.current && lineRef.current) {
            trRef.current.nodes([lineRef.current]);
            trRef.current.getLayer()?.batchDraw();
        }
    }, [isSelected]);

    const handleDragEnd = (e: KonvaEventObject<MouseEvent>) => {
        onDragEnd(e.target.y());
    };

    const handleTransformEnd = (e: any) => {
        const pStart = e.target
            .getAbsoluteTransform()
            .point({ x: e.target.points()[0], y: e.target.points()[1] });
        const pEnd = e.target
            .getAbsoluteTransform()
            .point({ x: e.target.points()[2], y: e.target.points()[3] });
        onTransformEnd(point.getTime(Math.floor(pStart.x)), point.getTime(Math.floor(pEnd.x)));
        e.target.scaleX(1);
        e.target.scaleY(1);
        setIsSelected(false);
    };

    return (
        <React.Fragment>
            <Line
                key={key}
                onClick={() => setIsSelected(!isSelected)}
                ref={lineRef}
                draggable
                {...lineProps}
                onDragEnd={handleDragEnd}
                onTransformEnd={handleTransformEnd}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    flipEnabled={false}
                    enabledAnchors={['middle-left', 'middle-right']}
                    rotateEnabled={false}
                    boundBoxFunc={(oldBox, newBox) => {
                        if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </React.Fragment>
    );
};

export default TransformableLine;
