import classNames from 'classnames';
import React, { HTMLAttributes } from 'react';
import './style.less';
import Icon from '@/components/Icon';
import { setIsDraw } from '@/store/draw';
import { useDispatch } from 'react-redux';
import { Tooltip } from 'react-tooltip';

export type IToolbarProps = HTMLAttributes<HTMLElement>;

const Toolbar: React.FC<IToolbarProps> = ({ className, ...resetProps }) => {
    const dispatch = useDispatch();

    const handleAdd = () => {
        dispatch(setIsDraw(true));
    };

    const handelExport = () => {};
    const handelDel = () => {};

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target?.files?.length) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], 'UTF-8');
        fileReader.onload = res => {
            if (res.target?.result && typeof res.target?.result === 'string') {
                // TODO
            }
        };
    };

    const handleLineUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target?.files?.length) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], 'UTF-8');
        fileReader.onload = res => {
            if (res.target?.result && typeof res.target?.result === 'string') {
                //TODO
            }
        };
    };

    const handleLineSave = () => {};

    return (
        <div className={classNames('home_page--toolbar', className)} {...resetProps}>
            <div className='toolbar_container'>
                <label className='toolbar_container--change'>
                    <Icon
                        className='c-qiehuanditu'
                        data-tooltip-id='toolbar-tooltip'
                        data-tooltip-content='切换底图'
                    ></Icon>
                    <input type='file' name='change' onChange={handleUpload} />
                </label>
                <Icon
                    className='c-daochu'
                    onClick={handelExport}
                    data-tooltip-id='toolbar-tooltip'
                    data-tooltip-content='导出底图'
                ></Icon>

                <div className='toolbar_container--line'></div>

                <Icon
                    className='c-sheji'
                    onClick={handleAdd}
                    data-tooltip-id='toolbar-tooltip'
                    data-tooltip-content='新增作业线'
                ></Icon>
                <Icon
                    className='c-shanchu'
                    onClick={handelDel}
                    data-tooltip-id='toolbar-tooltip'
                    data-tooltip-content='删除'
                ></Icon>

                <label className='toolbar_container--change'>
                    <Icon
                        className='c-dkwj'
                        data-tooltip-id='toolbar-tooltip'
                        data-tooltip-content='打开作业线'
                    ></Icon>
                    <input type='file' name='change' onChange={handleLineUpload} />
                </label>
                <Icon
                    className='c-baocun'
                    onClick={handleLineSave}
                    data-tooltip-id='toolbar-tooltip'
                    data-tooltip-content='保存作业线'
                ></Icon>

                <Tooltip id='toolbar-tooltip' />
            </div>
        </div>
    );
};

export default Toolbar;
