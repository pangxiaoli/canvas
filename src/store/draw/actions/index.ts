import { createAction } from '@reduxjs/toolkit';
import { TPlan, TStation } from '../initialState/type';
import { TLine } from '@/screens/pages/Home/Canvas/FgLayer/hooks/type';

export const loadStation = createAction<TStation>('draw/loadStation');
export const loadPlan = createAction<TPlan>('draw/loadPlan');

export const createPlan = createAction<TLine[]>('draw/createPlan');
