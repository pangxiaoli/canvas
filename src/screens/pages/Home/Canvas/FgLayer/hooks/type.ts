export type TUseDrawHandler = <T extends number>(timeStart: T, timeEnd: T, center: T) => void;
export type TUseDraw = () => TUseDrawHandler;
