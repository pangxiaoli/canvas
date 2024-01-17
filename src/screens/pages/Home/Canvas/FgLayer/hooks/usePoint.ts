import { getClasses, getIntervals, getSize } from '@/store/draw/selectors';
import { useSelector, shallowEqual } from 'react-redux';
import { TGetPoint, TGetPos, TPoint } from './type';
import { EClasses } from '@/store/draw/initialState/type';

const usePoint = () => {
    const intervals = useSelector(getIntervals, shallowEqual);

    const classes = useSelector(getClasses, shallowEqual);
    const timeStart = classes === EClasses.DAY ? 6 : 20;

    const size = useSelector(getSize, shallowEqual);
    const xLeft = size.captionW.reduce((a, b) => a + b, 0) + size.padding;
    const yTop = size.padding + size.titleH;

    const getPoint: TGetPoint = (x, y) => {
        const res: TPoint = {
            time: {
                h: 0,
                m: 0,
            },
            center: null,
        };

        for (const i of intervals) {
            if (y >= i.start && y < i.end) {
                res.center = {
                    yard: i.yard,
                    track: i.track,
                };
                break;
            }
        }

        const timeMin = (x - xLeft) / size.minW;
        res.time = {
            h: timeStart + Math.floor(timeMin / 60),
            m: Math.round(timeMin % 60),
        };

        return res;
    };

    const getPos: TGetPos = (timeH, timeM, trackID) => {
        const res = {
            x: 0,
            y: 0,
        };

        const index = intervals.findIndex(i => i.track.id === trackID);
        if (index > -1) {
            res.y = yTop + (index + 1) * size.rawH;
        }

        const timeMin = (timeH - timeStart) * 60 + timeM;
        res.x = xLeft + timeMin * size.minW;
        return res;
    };

    return {
        getPoint,
        getPos,
    };
};

export default usePoint;
