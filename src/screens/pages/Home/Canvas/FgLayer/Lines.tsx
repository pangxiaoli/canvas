import { Line } from 'react-konva';
import useDraw from './hooks/useDraw';
import usePoint from './hooks/usePoint';

const Lines = () => {
    const draw = useDraw();
    const point = usePoint();

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

export default Lines;
