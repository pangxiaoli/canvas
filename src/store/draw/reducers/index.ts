import { createReducer } from '@reduxjs/toolkit';
import initialState from '../initialState';
import { createPlan, loadStation } from '../actions';

export const stationReducer = createReducer(initialState, builder => {
    builder.addCase(loadStation, (state, action) => {
        const titleH = 10;

        const rawH = 70;
        const minW = 5;
        const colW = minW * 60;
        const colNum = 14;
        const padding = 30;
        const captionW = [40, 50];

        const tableH = action.payload.yards.reduce((a, b) => a + b.tracks.length, 0.5) * rawH;
        const tableW = colNum * colW + captionW.reduce((a, b) => a + b);

        const domH = tableH + padding * 2 + titleH;
        const domW = tableW + padding * 2;

        state.size = {
            titleH,
            rawH,
            minW,
            colW,
            colNum,
            tableH,
            tableW,
            domH,
            domW,
            padding,
            captionW,
        };
    });
});

export const planReducer = createReducer(initialState, builder => {
    builder.addCase(createPlan, (state, action) => {
        state.plan.path.push({
            train: Math.random().toString(36).slice(-5),
            scheme: action.payload,
        });
    });
});
