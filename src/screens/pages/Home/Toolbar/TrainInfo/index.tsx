import classNames from 'classnames';
import React, { HTMLAttributes } from 'react';
import './style.less';
import { Table } from 'antd';
import { getPath } from '@/store/draw/selectors';
import { useSelector, shallowEqual } from 'react-redux';

export type ITrainInfoProps = HTMLAttributes<HTMLElement>;

const TrainInfo: React.FC<ITrainInfoProps> = ({ className, ...resetProps }) => {
    const path = useSelector(getPath, shallowEqual);

    const data: any[] = [];
    path.forEach(i => {
        const obj = {
            train: i.train,
            arrival_time: i.scheme.at(0)?.startTime,
            departure_time: i.scheme.at(-1)?.endTiem,
        };
        data.push(obj);
    });

    const columns = [
        {
            title: '动车组编号',
            dataIndex: 'train',
            key: 'train',
        },
        {
            title: '到达时刻',
            dataIndex: 'arrival_time',
            key: 'arrival_time',
            render: (data: any) =>
                `${data.h < 10 ? '0' + data.h : data.h}:${data.m < 10 ? '0' + data.m : data.m}`,
        },
        {
            title: '出发时刻',
            dataIndex: 'departure_time',
            key: 'departure_time',
            render: (data: any) =>
                `${data.h < 10 ? '0' + data.h : data.h}:${data.m < 10 ? '0' + data.m : data.m}`,
        },
    ];

    return (
        <div className={classNames('train_info--com', className)} {...resetProps}>
            <Table dataSource={data} columns={columns as any} pagination={false} />
        </div>
    );
};

export default TrainInfo;
