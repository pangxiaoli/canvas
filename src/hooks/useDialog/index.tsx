import Dialog from '@/components/Dialog';
import { useState } from 'react';
import { TUseDialog } from './type';
import ReactDOM from 'react-dom';
import React from 'react';

const useDialog: TUseDialog = content => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [dialogData, setDialogData] = useState<any>(null);

    const open = (data: any) => {
        setIsOpen(true);
        setDialogData(data);
    };
    const close = () => setIsOpen(false);

    const ctx =
        isOpen &&
        ReactDOM.createPortal(
            <Dialog onClose={() => setIsOpen(false)}>
                {React.isValidElement(content)
                    ? React.cloneElement(content as React.ReactElement<any>, {
                          ...dialogData,
                      })
                    : null}
            </Dialog>,
            document.body,
        );

    return {
        ctx,
        open,
        close,
    };
};

export default useDialog;
