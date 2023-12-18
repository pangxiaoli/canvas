export type TInserval = {
    start: number;
    end: number;
    center: number;
    yard: string;
    track: TTrack;
};

export type TLine = {
    startX: number;
    endX: number;
    center: number;
    yard: string;
    track: TTrack;
};

export type TPath = {
    lines: TLine[];
};

export type TTrack = {
    id: string;
    name: string;
};

type TYards = {
    name: string;
    tracks: TTrack[];
};

type TTransferTime = {
    form: TTrack['id'];
    to: TTrack['id'];
    time: number;
};

export type TBaseData = {
    date: string;
    class: '0' | '1'; // 0 白班; 1 夜班
    group: string;
    admin: string;
    yards: TYards[];
    transferTime: TTransferTime[];
};

export type TDraw = {
    baseData: TBaseData;
    intervals: TInserval[];
    isDraw: boolean;
    path: TPath[];
};
