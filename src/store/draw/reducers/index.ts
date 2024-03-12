import { createReducer } from '@reduxjs/toolkit';
import initialState from '../initialState';
import {
    clearPlan,
    createPlan,
    delPlan,
    dragScheme,
    loadStation,
    resetPlan,
    updatePlan,
    updateSchemeTime,
} from '../actions';
import { addMin } from '../util/addMin';

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

        state.station = action.payload;
    });
});

export const planReducer = createReducer(initialState, builder => {
    builder.addCase(createPlan, (state, action) => {
        state.plan.path.push({
            id: state.plan.path.length,
            train: Math.random().toString(36).slice(-5),
            scheme: action.payload,
        });
    });

    builder.addCase(updatePlan, (state, action) => {
        const index = state.plan.path.findIndex(i => i.id === action.payload.id);
        if (index > -1) {
            state.plan.path[index] = action.payload;
        }
    });

    builder.addCase(delPlan, (state, action) => {
        const index = state.plan.path.findIndex(i => i.id === action.payload.id);
        if (index > -1) {
            state.plan.path.splice(index, 1);
        }
    });
    builder.addCase(clearPlan, state => {
        state.plan.path = [];
    });
    builder.addCase(resetPlan, (state, action) => {
        state.plan = action.payload;
    });
});

export const schemeReducer = createReducer(initialState, builder => {
    builder.addCase(dragScheme, (state, action) => {
        const pathIndex = state.plan.path.findIndex(i => i.id === action.payload.id);

        if (pathIndex > -1) {
            const scheme = state.plan.path[pathIndex].scheme[action.payload.schemeIndex];
            scheme.center = action.payload.center as any;
        }
    });

    builder.addCase(updateSchemeTime, (state, action) => {
        const pathIndex = state.plan.path.findIndex(i => i.id === action.payload.id);

        if (pathIndex > -1) {
            const scheme = state.plan.path[pathIndex].scheme[action.payload.schemeIndex];

            const dStartTime =
                action.payload.startTime.h * 60 +
                action.payload.startTime.m -
                scheme.startTime.h * 60 -
                scheme.startTime.m;
            const dEndTime =
                action.payload.endTime.h * 60 +
                action.payload.endTime.m -
                scheme.endTiem.h * 60 -
                scheme.endTiem.m;

            const lastScheme = state.plan.path[pathIndex].scheme[action.payload.schemeIndex - 1];
            const nextScheme = state.plan.path[pathIndex].scheme[action.payload.schemeIndex + 1];
            if (lastScheme) {
                lastScheme.endTiem = addMin(lastScheme.endTiem, dStartTime);
            }

            if (nextScheme) {
                nextScheme.startTime = addMin(nextScheme.startTime, dEndTime);
            }

            scheme.startTime = action.payload.startTime;
            scheme.endTiem = action.payload.endTime;
        }
    });
});
