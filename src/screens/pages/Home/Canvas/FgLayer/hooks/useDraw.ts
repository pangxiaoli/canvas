import { useContext } from 'react';
import { SizeCtx } from '../..';
import { TUseDraw } from './type';

const useDraw: TUseDraw = () => {
    const size = useContext(SizeCtx);

    return (timeStart, timeEnd, center) => {
        console.log(size, timeStart, timeEnd, center);
    };
};

export default useDraw;
