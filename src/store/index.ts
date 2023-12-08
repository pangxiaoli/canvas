import { configureStore } from '@reduxjs/toolkit';
import draw from './draw';

const store = configureStore({
    reducer: {
        draw: draw,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type TStatus = 'idle' | 'pedning' | 'succeeded' | 'failed';

export default store;
