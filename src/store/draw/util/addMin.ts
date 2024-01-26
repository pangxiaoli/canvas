import { TTime } from '@/screens/pages/Home/Canvas/FgLayer/hooks/type';

export const addMin = (time: TTime, min: number) => {
    const t = time.h * 60 + time.m + min;

    return {
        h: Math.floor(t / 60),
        m: t % 60,
    };
};
