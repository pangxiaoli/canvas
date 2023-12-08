import { createSlice } from '@reduxjs/toolkit';
import initialState from './initialState';

const draw = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setBaseData: (state, action) => {
            state.baseData = action.payload;

            state.path = [];
        },

        setIntervals: (state, action) => {
            state.intervals = action.payload;
        },
        setIsDraw: (state, action) => {
            state.isDraw = action.payload;
        },

        createPath: state => {
            if (!state.path.length || state.path.at(-1)?.lines.length) {
                state.path.push({ lines: [] });
            }
        },
        pushPath: (state, action) => {
            state.path.at(-1)?.lines.push(action.payload);
        },
        clearPath: state => {
            state.path = [];
        },
    },
});

export const { setBaseData, setIntervals, setIsDraw, createPath, pushPath, clearPath } =
    draw.actions;
export default draw.reducer;
