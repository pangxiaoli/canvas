export type TInserval = {
    start: number;
    end: number;
    name: string;
    area: string;
    center: number;
};

export type TLine = {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
};

export type TPath = {
    lines: TLine[];
};

type TBaseList = {
    name: string;
    lines: string[];
};

export type TBaseData = {
    date: string;
    class: string;
    group: string;
    admin: string;
    list: TBaseList[];
};

export type TDraw = {
    baseData: any;
    intervals: TInserval[];
    isDraw: boolean;
    path: TPath[];
};
