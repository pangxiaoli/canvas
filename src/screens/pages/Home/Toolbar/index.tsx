import classNames from 'classnames';
import React, { HTMLAttributes } from 'react';
import './style.less';
import Icon from '@/components/Icon';
import { setIsDraw } from '@/store/draw';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import TrackDesign from '../Canvas/BgLayer/TrackDesign';
import useDialog from '@/hooks/useDialog';
import { getPlan, getStation } from '@/store/draw/selectors';
import { downloadObjectAsToml } from './utils/downloadObjectAsYml';
import { formatDate } from '@/store/draw/util/formatDate';
import { parse } from 'yaml';
import { clearPlan, loadStation, resetPlan } from '@/store/draw/actions';
import Scheme from './Scheme';
import { useNavigate } from 'react-router-dom';
import TrainInfo from './TrainInfo';

export type IToolbarProps = HTMLAttributes<HTMLElement>;

const Toolbar: React.FC<IToolbarProps> = ({ className, ...resetProps }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const section = useSelector(getStation, shallowEqual);
    const plan = useSelector(getPlan, shallowEqual);

    const BgDedign = useDialog(<TrackDesign />);
    const SchemeDialog = useDialog(<Scheme />);
    const TrainInfoDialog = useDialog(<TrainInfo />);

    const handleAdd = () => {
        dispatch(setIsDraw(true));
    };

    const handelExport = () => {
        downloadObjectAsToml(section, formatDate(new Date()));
    };
    const handelDel = () => {
        dispatch(clearPlan());
    };

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target?.files?.length) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], 'UTF-8');
        fileReader.onload = res => {
            if (res.target?.result && typeof res.target?.result === 'string') {
                const yml = parse(res.target.result);
                dispatch(loadStation(yml));
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
                const yml = parse(res.target.result);
                dispatch(resetPlan(yml));
            }
        };
    };

    const handleLineSave = () => {
        downloadObjectAsToml(plan, formatDate(new Date()));
    };

    const handleScheme = () => {
        SchemeDialog.open();
    };

    return (
        <div className={classNames('home_page--toolbar', className)} {...resetProps}>
            <div className='toolbar_container'>
                <label className='toolbar_container--change'>
                    <Icon
                        className='fa-solid fa-retweet'
                        data-tooltip-id='toolbar-tooltip'
                        data-tooltip-content='切换底图'
                    ></Icon>
                    <input type='file' name='change' onChange={handleUpload} />
                </label>

                <Icon
                    className='fa-solid fa-download'
                    onClick={handelExport}
                    data-tooltip-id='toolbar-tooltip'
                    data-tooltip-content='导出底图'
                ></Icon>

                <Icon
                    onClick={BgDedign.open}
                    className='fa-solid fa-wrench'
                    data-tooltip-id='toolbar-tooltip'
                    data-tooltip-content='编辑底图'
                ></Icon>

                <div className='toolbar_container--line'></div>

                <Icon
                    className='fa-solid fa-pen-ruler'
                    onClick={handleAdd}
                    data-tooltip-id='toolbar-tooltip'
                    data-tooltip-content='新增作业线'
                ></Icon>

                <Icon
                    className='fa-solid fa-trash-can'
                    onClick={handelDel}
                    data-tooltip-id='toolbar-tooltip'
                    data-tooltip-content='删除'
                ></Icon>

                <label className='toolbar_container--change'>
                    <Icon
                        className='fa-solid fa-folder-open'
                        data-tooltip-id='toolbar-tooltip'
                        data-tooltip-content='打开作业线'
                    ></Icon>
                    <input type='file' name='change' onChange={handleLineUpload} />
                </label>

                <Icon
                    className='fa-solid fa-download'
                    onClick={handleLineSave}
                    data-tooltip-id='toolbar-tooltip'
                    data-tooltip-content='保存作业线'
                ></Icon>

                <Icon
                    className='fa-solid fa-circle-info'
                    onClick={handleScheme}
                    data-tooltip-id='toolbar-tooltip'
                    data-tooltip-content='股道信息统计'
                ></Icon>

                <Icon
                    className='fa-solid fa-train'
                    onClick={TrainInfoDialog.open}
                    data-tooltip-id='toolbar-tooltip'
                    data-tooltip-content='车辆信息统计'
                ></Icon>

                <div className='toolbar_container--line'></div>

                <Icon
                    className='fa-solid fa-right-left'
                    onClick={() => navigate('/login')}
                    data-tooltip-id='toolbar-tooltip'
                    data-tooltip-content='交接班'
                ></Icon>

                <a
                    href='http://github.com/pangxiaoli/canvas'
                    target='_blank'
                    className='toolbar_container--github'
                >
                    <Icon className='fa-brands fa-github'></Icon>
                </a>

                {BgDedign.Ctx}
                {SchemeDialog.Ctx}
                {TrainInfoDialog.Ctx}

                <Tooltip id='toolbar-tooltip' />
            </div>
        </div>
    );
};

export default Toolbar;
