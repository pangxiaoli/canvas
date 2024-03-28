import { getStation } from '@/store/draw/selectors';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
    ProCard,
    ProFormGroup,
    ProFormList,
    ProFormSelect,
    ProFormText,
    StepsForm,
} from '@ant-design/pro-components';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.less';
import { loadStation } from '@/store/draw/actions';

const TrackDrsign = ({ close }: any) => {
    const formRef = useRef<ProFormInstance>();

    const station = useSelector(getStation);
    const dispatch = useDispatch();

    return (
        <ProCard>
            <StepsForm
                formRef={formRef}
                onFinish={async (value: any) => {
                    const res = {
                        name: '',
                        yards: value.tracks.reduce((a: any, b: any) => {
                            const item = a.find((i: any) => i.name === b.yard);

                            if (item) {
                                item.tracks.push({
                                    id: b.value,
                                    name: b.label,
                                });
                            } else {
                                a.push({
                                    name: b.yard,
                                    tracks: [
                                        {
                                            id: b.value,
                                            name: b.label,
                                        },
                                    ],
                                });
                            }

                            return a;
                        }, []),
                        switch: value.switchs,
                    };
                    dispatch(loadStation(res));
                    close();
                }}
                formProps={{
                    validateMessages: {
                        required: '此项为必填项',
                    },
                }}
            >
                <StepsForm.StepForm
                    name='yards'
                    title='车场信息'
                    stepProps={{}}
                    onFinish={async () => {
                        return true;
                    }}
                >
                    <ProFormList
                        name='yards'
                        min={1}
                        initialValue={station.yards.map(i => ({ label: i.name, value: i.name }))}
                        copyIconProps={false}
                        deleteIconProps={{
                            tooltipText: '删除',
                        }}
                    >
                        <ProFormGroup key='group'>
                            <ProFormText name='value' label='车场' />
                        </ProFormGroup>
                    </ProFormList>
                </StepsForm.StepForm>
                <StepsForm.StepForm
                    name='tracks'
                    title='股道信息'
                    stepProps={{}}
                    onFinish={async () => {
                        return true;
                    }}
                >
                    <ProFormList
                        name='tracks'
                        initialValue={station.yards.flatMap(i =>
                            i.tracks.map(j => ({
                                label: j.name,
                                value: j.id,
                                yard: i.name,
                                time_shot: j.time_shot,
                                time_long: j.time_long,
                            })),
                        )}
                        copyIconProps={false}
                        deleteIconProps={{
                            tooltipText: '删除',
                        }}
                    >
                        <ProFormGroup key='group'>
                            <ProFormText name='label' label='股道' />
                            <ProFormSelect
                                label='车场'
                                name='yard'
                                options={station.yards.map(i => ({ value: i.name, label: i.name }))}
                            />
                            <ProFormText name='time_shot' label='最小作业时间标准(短编)' />
                            <ProFormText name='time_long' label='最小作业时间标准(长编)' />
                        </ProFormGroup>
                    </ProFormList>
                </StepsForm.StepForm>
                <StepsForm.StepForm
                    name='switchs'
                    title='道岔信息'
                    stepProps={{}}
                    onFinish={async () => {
                        return true;
                    }}
                >
                    <ProFormList
                        name='switchs'
                        initialValue={station.switch}
                        copyIconProps={false}
                        deleteIconProps={{
                            tooltipText: '删除',
                        }}
                    >
                        <ProFormGroup key='group'>
                            <ProFormSelect
                                label='股道1'
                                name={['track0', 'id']}
                                options={station.yards.flatMap(i =>
                                    i.tracks.map(j => ({
                                        label: j.name,
                                        value: j.id,
                                    })),
                                )}
                            />
                            <ProFormSelect
                                label='股道1'
                                name={['track1', 'id']}
                                options={station.yards.flatMap(i =>
                                    i.tracks.map(j => ({
                                        label: j.name,
                                        value: j.id,
                                    })),
                                )}
                            />
                            <ProFormText name='id' label='道岔编号' />
                            <ProFormText name='time' label='通过时间(min)' />
                        </ProFormGroup>
                    </ProFormList>
                </StepsForm.StepForm>
            </StepsForm>
        </ProCard>
    );
};

export default TrackDrsign;
