import { TLine } from '@/screens/pages/Home/Canvas/FgLayer/hooks/type';

export type TInserval = {
    start: number;
    end: number;
    center: number;
    yard: string;
    track: TTrack;
};

export type TTrack = {
    id: string;
    name: string;
};

type TYard = {
    name: string;
    /** 股道 */
    tracks: TTrack[];
};
type TSwitch = {
    id: string;
    tracks: [TTrack['id'], TTrack['id']];
    /** 通过时间 */
    time: number;
};
export type TStation = {
    name: string;
    /** 车厂 */
    yards: TYard[];
    /** 道岔 */
    switch: TSwitch[];
};
export enum EClasses {
    DAY,
    NIGHT,
}

type TPlanPath = {
    train: string;
    scheme: TLine[];
};
export type TPlan = {
    date: string;
    classes: EClasses;
    group: string;
    admin: string;
    path: TPlanPath[];
};
export type TSize = {
    titleH: number;
    rawH: number;
    /** 每分钟宽度 */
    minW: number;
    /** 每列 即 1h 宽度 */
    colW: number;
    /** 列数 */
    colNum: number;
    tableH: number;
    tableW: number;
    domH: number;
    domW: number;
    padding: number;
    captionW: number[];
};
export type TDraw = {
    size: TSize;
    intervals: TInserval[];
    isDraw: boolean;
    station: TStation;
    plan: TPlan;
};
