import { ReactNode } from 'react';

export type TUseDialog = (content: ReactNode) => {
    ctx: ReactNode;
    open: (data?: any) => void;
    close: () => void;
};
