import { TInserval } from '@/store/draw/initialState/type';

type TFindIntervalName = (
    intervals: TInserval[],
    y: number,
) => Pick<TInserval, 'yard' | 'track' | 'center'>;

export const findIntervalName: TFindIntervalName = (intervals, y) => {
    for (let index = 0; index < intervals.length; index++) {
        if (y > intervals[index].start && y <= intervals[index].end) {
            return {
                yard: intervals[index].yard,
                track: intervals[index].track,
                center: intervals[index].center,
            };
        }
    }

    return {
        yard: '界外',
        track: {
            id: '-1',
            name: '界外',
        },
        center: -1,
    };
};
