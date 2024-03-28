import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import initialState from './initialState';
import {
    clearPlan,
    createPlan,
    dragScheme,
    loadStation,
    resetPlan,
    setPlanInfo,
    updateSchemeTime,
} from './actions';
import { planReducer, schemeReducer, stationReducer } from './reducers';
import { EPenState } from './initialState/type';

const draw = createSlice({
    name: 'draw',
    initialState,
    reducers: {
        setPenState: (state, action: PayloadAction<EPenState>) => {
            state.penState = action.payload;
        },
        setIntervals: (state, action) => {
            state.intervals = action.payload;
        },
        setIsDraw: (state, action) => {
            state.isDraw = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(loadStation, stationReducer);
        builder.addCase(createPlan, planReducer);
        builder.addCase(clearPlan, planReducer);
        builder.addCase(setPlanInfo, planReducer);
        builder.addCase(dragScheme, schemeReducer);
        builder.addCase(resetPlan, planReducer);
        builder.addCase(updateSchemeTime, schemeReducer);
    },
});

export const { setIntervals, setPenState, setIsDraw } = draw.actions;
export default draw.reducer;
