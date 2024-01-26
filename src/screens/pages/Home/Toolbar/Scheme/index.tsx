import classNames from 'classnames';
import React, { HTMLAttributes } from 'react';
import './style.less';
import { shallowEqual, useSelector } from 'react-redux';
import { getPath } from '@/store/draw/selectors';
import { Table } from 'antd';

export type ISchemeProps = HTMLAttributes<HTMLElement>;

const Scheme: React.FC<ISchemeProps> = ({ className, ...resetProps }) => {
    const path = useSelector(getPath, shallowEqual);

    const data: any[] = [];
    path.forEach(i => {
        i.scheme.forEach(j => {
            const id = j.center.track.id;
            const item = data.find(item => item.track.id === id);

            const time = j.endTiem.h * 60 + j.endTiem.m - j.startTime.h * 60 - j.startTime.m;

            if (item) {
                item.trains.push({
                    startTime: j.startTime,
                    endTime: j.endTiem,
                });
                item.time += time;
            } else {
                data.push({
                    track: {
                        id,
                        name: j.center.track.name,
                        yard: j.center.yard,
                    },
                    time,
                    trains: [
                        {
                            startTime: j.startTime,
                            endTime: j.endTiem,
                        },
                    ],
                });
            }
        });
    });

    const columns = [
        {
            title: '股道类型',
            dataIndex: 'track',
            key: 'yard',
            render: (data: any) => data.yard,
        },
        {
            title: '股道',
            dataIndex: 'track',
            key: 'track',
            render: (data: any) => data.name,
        },
        {
            title: '占用时间(min)',
            dataIndex: 'time',
            key: 'time',
            align: 'center',
        },
        {
            title: '占用比例',
            dataIndex: 'time',
            key: 'address',
            render: (data: any) => `${(data / (14 * 60)).toFixed(2)}%`,
        },
        {
            title: '占用车辆信息',
            dataIndex: 'trains',
            key: 'trains',
            render: (data: any[]) =>
                data.map(i => `${i.startTime.h}:${i.startTime.m}-${i.endTime.h}:${i.endTime.m}  `),
        },
    ];

    return (
        <div className={classNames('scheme_com', className)} {...resetProps}>
            <Table dataSource={data} columns={columns as any} pagination={false} />
        </div>
    );
};

export default Scheme;
