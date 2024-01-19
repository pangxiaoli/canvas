type TTime = {
    h: number;
    m: number;
};

export type TLine = {
    startTime: TTime;
    endTiem: TTime;
    center: {
        yard: string;
        track: {
            id: string;
            name: string;
        };
    };
};

export type TAddLine = <T extends number>(x: T, y: T) => void;
export type TPushPoint = <T extends number>(x: T, y: T) => void;
export type TClearLine = () => void;
export type TUseDraw = () => {
    lines: TLine[];
    addLine: TAddLine;
    pushPoint: TPushPoint;
    clearLine: TClearLine;
};

export type TPoint = {
    time: TTime;
    center: {
        yard: string;
        track: {
            id: string;
            name: string;
        };
    } | null;
};
export type TPos = {
    x: number;
    y: number;
};

export type TGetPoint = <T extends number>(x: T, y: T) => TPoint;
export type TGetPos = <T extends number>(timeH: T, timeM: T, trackID: string) => TPos;
export type TUsePoion = () => {
    getPoint: TGetPoint;
};

/**
 * @param form trackID
 * @param to trackID
 */
export type TTimePassed = <T extends string>(from: T, to: T) => number;
export type TUseSwitch = () => {
    timePassed: TTimePassed;
};
