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
                    },
                ],
            },
            {
                name: '检修线',
                tracks: [
                    {
                        id: '3',
                        name: 'D6',
                    },
                    {
                        id: '4',
                        name: 'D7',
                    },
                    {
                        id: '5',
                        name: 'D8',
                    },
                    {
                        id: '6',
                        name: 'D9',
                    },
                ],
            },
            {
                name: '清洗线',
                tracks: [
                    {
                        id: '7',
                        name: 'D25',
                    },
                    {
                        id: '8',
                        name: 'D26',
                    },
                ],
            },
            {
                name: '存车线',
                tracks: [
                    {
                        id: '9',
                        name: 'D10',
                    },
                    {
                        id: '10',
                        name: 'D11',
                    },
                    {
                        id: '11',
                        name: 'D12',
                    },
                    {
                        id: '12',
                        name: 'D13',
                    },
                    {
                        id: '13',
                        name: 'D14',
                    },
                    {
                        id: '14',
                        name: 'D15',
                    },
                    {
                        id: '15',
                        name: 'D16',
                    },
                    {
                        id: '16',
                        name: 'D17',
                    },
                    {
                        id: '17',
                        name: 'D18',
                    },
                ],
            },
            {
                name: '临修线',
                tracks: [
                    {
                        id: '18',
                        name: 'D3',
                    },
                    {
                        id: '19',
                        name: 'D4',
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
        titleH: 10,
        rawH: 70,
        minW: 5,
        colW: 300,
        colNum: 14,
        tableH: 1435,
        tableW: 4290,
        domH: 1505,
        domW: 4350,
        padding: 30,
        captionW: [40, 50],
    },
};

export default initialState;
