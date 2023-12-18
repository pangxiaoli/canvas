import { RootState } from '@/store';
import { TDraw } from '../initialState/type';

export type TGetBaseData = (state: RootState) => TDraw['baseData'];
export type TGetTransferTime = (state: RootState) => TDraw['baseData']['transferTime'];

export type TGetIntervals = (state: RootState) => TDraw['intervals'];
export type TGetIsDraw = (state: RootState) => TDraw['isDraw'];
export type TGetPath = (state: RootState) => TDraw['path'];
