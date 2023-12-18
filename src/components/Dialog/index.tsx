import classNames from 'classnames';
import React, { HTMLAttributes, MouseEvent, useEffect } from 'react';
import './style.less';

export type IDialogProps = HTMLAttributes<HTMLElement> & {
    onClose: () => void;
};

const Dialog: React.FC<IDialogProps> = ({ className, children, onClose, ...resetProps }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLDivElement).classList.contains('dialog_com')) {
            onClose();
        }
    };

    return (
        <div className={classNames('dialog_com', className)} {...resetProps} onClick={handleClick}>
            <div className='dialog_com--container'>{children}</div>
        </div>
    );
};

export default Dialog;
