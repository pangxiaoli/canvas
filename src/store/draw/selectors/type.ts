import { RootState } from '@/store';
import { EClasses, TDraw } from '../initialState/type';

export type TGetIntervals = (state: RootState) => TDraw['intervals'];
export type TGetIsDraw = (state: RootState) => TDraw['isDraw'];
export type TGetPenState = (state: RootState) => TDraw['penState'];
export type TGetSTation = (state: RootState) => TDraw['station'];
export type TGetPlan = (state: RootState) => TDraw['plan'];
export type TGetPath = (state: RootState) => TDraw['plan']['path'];
export type TGetSize = (state: RootState) => TDraw['size'];
export type TGetClasses = (state: RootState) => EClasses;
