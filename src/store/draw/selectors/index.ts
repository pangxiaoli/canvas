import { TGetBaseData, TGetIntervals, TGetIsDraw, TGetPath } from './type';

export const getBaseData: TGetBaseData = state => state.draw.baseData;
export const getIntervals: TGetIntervals = state => state.draw.intervals;
export const getIsDraw: TGetIsDraw = state => state.draw.isDraw;
export const getPath: TGetPath = state => state.draw.path;
