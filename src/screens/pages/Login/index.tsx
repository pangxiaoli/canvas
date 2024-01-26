import classNames from 'classnames';
import React, { HTMLAttributes } from 'react';
import './style.less';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import { EClasses } from '@/store/draw/initialState/type';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPlanInfo } from '@/store/draw/actions';

export type ILoinProps = HTMLAttributes<HTMLElement>;

const Loin: React.FC<ILoinProps> = ({ className, ...resetProps }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = (e: any) => {
        dispatch(
            setPlanInfo({
                date: e.date.format('YYYY-MM-DD'),
                group: e.group,
                classes: e.classes,
                admin: e.admin,
            }),
        );
        navigate('/edit');
    };

    return (
        <div className={classNames('login_page', className)} {...resetProps}>
            <Form name='login' onFinish={onFinish}>
                <Form.Item name='date' label='日期'>
                    <DatePicker></DatePicker>
                </Form.Item>
                <Form.Item name='group' label='班别'>
                    <Select>
                        <Select.Option value='甲班'>甲班</Select.Option>
                        <Select.Option value='乙班'>乙班</Select.Option>
                        <Select.Option value='丙班'>丙班</Select.Option>
                        <Select.Option value='丁班'>丁班</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name='classes' label='白/夜班'>
                    <Select>
                        <Select.Option value={EClasses.DAY}>白班</Select.Option>
                        <Select.Option value={EClasses.NIGHT}>夜班</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name='admin' label='调度员'>
                    <Input></Input>
                </Form.Item>
                <Form.Item>
                    <Button htmlType='submit' type='primary'>
                        确认
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Loin;
