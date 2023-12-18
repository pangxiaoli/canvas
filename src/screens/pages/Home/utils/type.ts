import { TBaseData } from '@/store/draw/initialState/type';

export type TSize = {
    titleH: number;
    rawH: number;
    colW: number;
    colNum: number;
    tableH: number;
    tableW: number;
    domH: number;
    domW: number;
    padding: number;
    captionW: number[];
    data: TBaseData;
};

export type TCalcCanvas = (data: TBaseData) => TSize;
