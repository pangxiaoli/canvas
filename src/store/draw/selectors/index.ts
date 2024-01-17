import {
    TGetClasses,
    TGetIntervals,
    TGetIsDraw,
    TGetPath,
    TGetPlan,
    TGetSTation,
    TGetSize,
} from './type';

export const getIntervals: TGetIntervals = state => state.draw.intervals;
export const getIsDraw: TGetIsDraw = state => state.draw.isDraw;

export const getStation: TGetSTation = state => state.draw.station;
export const getPlan: TGetPlan = state => state.draw.plan;
export const getPath: TGetPath = state => state.draw.plan.path;
export const getSize: TGetSize = state => state.draw.size;
export const getClasses: TGetClasses = state => state.draw.plan.classes;
