import { createAction } from '@reduxjs/toolkit';
import { TPlan, TPlanPath, TStation } from '../initialState/type';
import { TLine, TTime } from '@/screens/pages/Home/Canvas/FgLayer/hooks/type';

export const loadStation = createAction<TStation>('draw/loadStation');
export const loadPlan = createAction<TPlan>('draw/loadPlan');

export const createPlan = createAction<{ train: string; scheme: TLine[] }>('draw/createPlan');
export const updatePlan = createAction<TPlanPath>('draw/updatePlan');
export const clearPlan = createAction<void>('draw/clearPlan');
export const delPlan = createAction<Pick<TPlanPath, 'id'>>('draw/delPlan');
export const resetPlan = createAction<any>('draw/resetPlan');

export const dragScheme = createAction<
    Pick<TPlanPath, 'id'> & { schemeIndex: number; center: Pick<TLine, 'center'> }
>('draw/dragScheme');
export const updateSchemeTime = createAction<
    Pick<TPlanPath, 'id'> & { schemeIndex: number; startTime: TTime; endTime: TTime }
>('drag/updateSchemeTime');

export const setPlanInfo = createAction<Partial<Omit<TPlan, 'path'>>>('draw/setPlanInfo');
