import { TBaseData } from '@/store/draw/initialState/type';

export type TSize = {
    titleH: number;
    rawH: number;
    colW: number;
    tableH: number;
    tableW: number;
    domH: number;
    domW: number;
    canvasH: number;
    canvasW: number;
    padding: number;
    dpi: number;
    captionW: number[];
    data: TBaseData;
};

export type TCalcCanvas = (data: TBaseData) => TSize;
