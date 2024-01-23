import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import initialState from './initialState';
import { createPlan, dragScheme, loadStation, updateSchemeTime } from './actions';
import { planReducer, schemeReducer, stationReducer } from './reducers';
import { EPenState } from './initialState/type';

const draw = createSlice({
    name: 'user',
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
        builder.addCase(dragScheme, schemeReducer);
        builder.addCase(updateSchemeTime, schemeReducer);
    },
});

export const { setIntervals, setPenState, setIsDraw } = draw.actions;
export default draw.reducer;
