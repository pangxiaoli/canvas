import { ReactNode } from 'react';

export type TUseDialog = (content: ReactNode) => {
    Ctx: ReactNode;
    open: (data?: any) => void;
    close: () => void;
};
