import classNames from 'classnames';
import React, { HTMLAttributes } from 'react';
import './style.less';
import { TPath } from '@/store/draw/initialState/type';
import { TSize } from '../../../utils/type';

export type ITrainInfoProps = HTMLAttributes<HTMLElement> & {
    data: TPath;
    size: TSize;
};

const addLeadingZero = (num: number) => {
    if (num < 10) {
        return '0' + num;
    }
    return num.toString();
};

const TrainInfo: React.FC<ITrainInfoProps> = ({ className, data, size, ...resetProps }) => {
    const timeStart = size.data.class === '0' ? 6 : 20;
    const captionW = size.captionW.reduce((a, b) => a + b, 0);

    return (
        <div className={classNames('trainInfo_com', className)} {...resetProps}>
            <table className='trainInfo_com--table'>
                <thead>
                    <tr>
                        <th>车场</th>
                        <th>股道</th>
                        <th>到达时刻</th>
                        <th>离开时刻</th>
                    </tr>
                </thead>
                <tbody>
                    {data.lines.map((i, index) => (
                        <tr key={index}>
                            <td>{i.yard}</td>
                            <td>{i.track.name}</td>
                            <td>
                                {addLeadingZero(
                                    Math.floor((i.startX - captionW) / size.colW) + timeStart,
                                )}
                                :
                                {addLeadingZero(
                                    Math.floor(
                                        (((i.startX - captionW) % size.colW) * 60) / size.colW,
                                    ),
                                )}
                            </td>
                            <td>
                                {addLeadingZero(
                                    Math.floor((i.endX - captionW) / size.colW) + timeStart,
                                )}
                                :
                                {addLeadingZero(
                                    Math.floor(
                                        (((i.endX - captionW) % size.colW) * 60) / size.colW,
                                    ),
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TrainInfo;
