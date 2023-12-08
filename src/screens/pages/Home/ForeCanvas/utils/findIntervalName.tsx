import { TInserval } from '@/store/draw/initialState/type';

export const findIntervalName = (intervals: TInserval[], y: number) => {
    for (let index = 0; index < intervals.length; index++) {
        if (y > intervals[index].start && y < intervals[index].end) {
            return {
                name: intervals[index].name,
                area: intervals[index].area,
                center: intervals[index].center,
            };
        }
    }

    return {
        name: '界外',
        area: '界外',
        center: -1,
    };
};
