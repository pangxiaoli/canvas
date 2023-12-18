import { TGetBaseData, TGetIntervals, TGetIsDraw, TGetPath, TGetTransferTime } from './type';

export const getBaseData: TGetBaseData = state => state.draw.baseData;
export const getTransferTime: TGetTransferTime = state => state.draw.baseData.transferTime;

export const getIntervals: TGetIntervals = state => state.draw.intervals;
export const getIsDraw: TGetIsDraw = state => state.draw.isDraw;
export const getPath: TGetPath = state => state.draw.path;
