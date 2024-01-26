import { TTime } from '@/screens/pages/Home/Canvas/FgLayer/hooks/type';

const getTimeDifference = (time1: TTime, time2: TTime) => {
    const totalMinutes1 = time1.h * 60 + time1.m;
    const totalMinutes2 = time2.h * 60 + time2.m;
    return Math.abs(totalMinutes1 - totalMinutes2);
};

export default getTimeDifference;
