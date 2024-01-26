import { formatDate } from '../util/formatDate';
import { EClasses, EPenState, TDraw } from './type';

const initialState: TDraw = {
    isDraw: false,
    penState: EPenState.NOT_STARTED,
    intervals: [],
    station: {
        name: '上海南',
        yards: [
            {
                name: '到达',
                tracks: [
                    {
                        id: '1',
                        name: '上海南',
                    },
                ],
            },
            {
                name: '应急线',
                tracks: [
                    {
                        id: '2',
                        name: 'D19',
                        time_shot: 20,
                        time_long: 40,
                    },
                ],
            },
            {
                name: '检修线',
                tracks: [
                    {
                        id: '3',
                        name: 'D6',
                        time_shot: 20,
                        time_long: 40,
                    },
                    {
                        id: '4',
                        name: 'D7',
                        time_shot: 20,
                        time_long: 40,
                    },
                    {
                        id: '5',
                        name: 'D8',
                        time_shot: 20,
                        time_long: 40,
                    },
                    {
                        id: '6',
                        name: 'D9',
                        time_shot: 20,
                        time_long: 40,
                    },
                ],
            },
            {
                name: '清洗线',
                tracks: [
                    {
                        id: '7',
                        name: 'D25',
                        time_shot: 20,
                        time_long: 40,
                    },
                    {
                        id: '8',
                        name: 'D26',
                        time_shot: 20,
                        time_long: 40,
                    },
                ],
            },
            {
                name: '存车线',
                tracks: [
                    {
                        id: '9',
                        name: 'D10',
                        time_shot: 20,
                        time_long: 40,
                    },
                    {
                        id: '10',
                        name: 'D11',
                        time_shot: 20,
                        time_long: 40,
                    },
                    {
                        id: '11',
                        name: 'D12',
                        time_shot: 20,
                        time_long: 40,
                    },
                    {
                        id: '12',
                        name: 'D13',
                        time_shot: 20,
                        time_long: 40,
                    },
                    {
                        id: '13',
                        name: 'D14',
                        time_shot: 20,
                        time_long: 40,
                    },
                    {
                        id: '14',
                        name: 'D15',
                        time_shot: 20,
                        time_long: 40,
                    },
                    {
                        id: '15',
                        name: 'D16',
                        time_shot: 20,
                        time_long: 40,
                    },
                    {
                        id: '16',
                        name: 'D17',
                        time_shot: 20,
                        time_long: 40,
                    },
                    {
                        id: '17',
                        name: 'D18',
                        time_shot: 20,
                        time_long: 40,
                    },
                ],
            },
            {
                name: '临修线',
                tracks: [
                    {
                        id: '18',
                        name: 'D3',
                        time_shot: 20,
                        time_long: 40,
                    },
                    {
                        id: '19',
                        name: 'D4',
                        time_shot: 20,
                        time_long: 40,
                    },
                ],
            },
            {
                name: '出发',
                tracks: [
                    {
                        id: '20',
                        name: '上海南',
                    },
                ],
            },
        ],
        switch: [
            {
                id: '1，2',
                track0: {
                    id: '1',
                    name: '上海南',
                },
                track1: {
                    id: '2',
                    name: 'D19',
                },
                time: 2,
            },
            {
                id: '3，4，5',
                track0: {
                    id: '2',
                    name: 'D19',
                },
                track1: {
                    id: '3',
                    name: 'D6',
                },
                time: 3,
            },
        ],
    },
    plan: {
        date: formatDate(new Date()),
        classes: EClasses.DAY,
        group: '',
        admin: '',
        path: [],
    },
    size: {
        titleH: 70,
        rawH: 70,
        minW: 5,
        colW: 300,
        colNum: 14,
        tableH: 1435,
        tableW: 4290,
        domH: 1565,
        domW: 4350,
        padding: 30,
        captionW: [40, 50],
    },
};

export default initialState;
