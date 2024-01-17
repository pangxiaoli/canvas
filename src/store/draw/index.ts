import { createSlice } from '@reduxjs/toolkit';
import initialState from './initialState';
import { createPlan, loadStation } from './actions';
import { planReducer, stationReducer } from './reducers';

const draw = createSlice({
    name: 'user',
    initialState,
    reducers: {
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
    },
});

export const { setIntervals, setIsDraw } = draw.actions;
export default draw.reducer;
