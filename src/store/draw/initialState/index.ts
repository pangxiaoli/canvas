import { formatDate } from '../util/formatDate';
import { TDraw } from './type';

const initialState: TDraw = {
    baseData: {
        date: formatDate(new Date()),
        class: '0',
        group: '乙',
        admin: '',
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
        transferTime: [
            {
                form: '1',
                to: '2',
                time: 1,
            },
            {
                form: '1',
                to: '3',
                time: 2,
            },
            {
                form: '1',
                to: '4',
                time: 2,
            },
            {
                form: '1',
                to: '5',
                time: 2,
            },
            {
                form: '1',
                to: '6',
                time: 2,
            },
            {
                form: '1',
                to: '7',
                time: 3,
            },
            {
                form: '1',
                to: '8',
                time: 3,
            },
            {
                form: '1',
                to: '9',
                time: 4,
            },
            {
                form: '1',
                to: '10',
                time: 4,
            },
            {
                form: '1',
                to: '11',
                time: 4,
            },
            {
                form: '1',
                to: '12',
                time: 4,
            },
            {
                form: '1',
                to: '13',
                time: 4,
            },
            {
                form: '1',
                to: '14',
                time: 4,
            },
            {
                form: '1',
                to: '15',
                time: 4,
            },
            {
                form: '1',
                to: '16',
                time: 4,
            },
            {
                form: '1',
                to: '17',
                time: 4,
            },
            {
                form: '1',
                to: '18',
                time: 5,
            },
            {
                form: '1',
                to: '19',
                time: 5,
            },
            {
                form: '1',
                to: '20',
                time: 6,
            },
            {
                form: '2',
                to: '3',
                time: 1,
            },
            {
                form: '2',
                to: '4',
                time: 1,
            },
            {
                form: '2',
                to: '5',
                time: 1,
            },
            {
                form: '2',
                to: '6',
                time: 1,
            },
            {
                form: '2',
                to: '7',
                time: 2,
            },
            {
                form: '2',
                to: '8',
                time: 2,
            },
            {
                form: '2',
                to: '9',
                time: 3,
            },
            {
                form: '2',
                to: '10',
                time: 3,
            },
            {
                form: '2',
                to: '11',
                time: 3,
            },
            {
                form: '2',
                to: '12',
                time: 3,
            },
            {
                form: '2',
                to: '13',
                time: 3,
            },
            {
                form: '2',
                to: '14',
                time: 3,
            },
            {
                form: '2',
                to: '15',
                time: 3,
            },
            {
                form: '2',
                to: '16',
                time: 3,
            },
            {
                form: '2',
                to: '17',
                time: 3,
            },
            {
                form: '2',
                to: '18',
                time: 4,
            },
            {
                form: '2',
                to: '19',
                time: 4,
            },
            {
                form: '2',
                to: '20',
                time: 5,
            },
            {
                form: '3',
                to: '7',
                time: 1,
            },
            {
                form: '3',
                to: '8',
                time: 1,
            },
            {
                form: '3',
                to: '9',
                time: 2,
            },
            {
                form: '3',
                to: '10',
                time: 2,
            },
            {
                form: '3',
                to: '11',
                time: 2,
            },
            {
                form: '3',
                to: '12',
                time: 2,
            },
            {
                form: '3',
                to: '13',
                time: 2,
            },
            {
                form: '3',
                to: '14',
                time: 2,
            },
            {
                form: '3',
                to: '15',
                time: 2,
            },
            {
                form: '3',
                to: '16',
                time: 2,
            },
            {
                form: '3',
                to: '17',
                time: 2,
            },
            {
                form: '3',
                to: '18',
                time: 3,
            },
            {
                form: '3',
                to: '19',
                time: 3,
            },
            {
                form: '3',
                to: '20',
                time: 4,
            },
            {
                form: '4',
                to: '7',
                time: 1,
            },
            {
                form: '4',
                to: '8',
                time: 1,
            },
            {
                form: '4',
                to: '9',
                time: 2,
            },
            {
                form: '4',
                to: '10',
                time: 2,
            },
            {
                form: '4',
                to: '11',
                time: 2,
            },
            {
                form: '4',
                to: '12',
                time: 2,
            },
            {
                form: '4',
                to: '13',
                time: 2,
            },
            {
                form: '4',
                to: '14',
                time: 2,
            },
            {
                form: '4',
                to: '15',
                time: 2,
            },
            {
                form: '4',
                to: '16',
                time: 2,
            },
            {
                form: '4',
                to: '17',
                time: 2,
            },
            {
                form: '4',
                to: '18',
                time: 3,
            },
            {
                form: '4',
                to: '19',
                time: 3,
            },
            {
                form: '4',
                to: '20',
                time: 4,
            },
            {
                form: '5',
                to: '7',
                time: 1,
            },
            {
                form: '5',
                to: '8',
                time: 1,
            },
            {
                form: '5',
                to: '9',
                time: 2,
            },
            {
                form: '5',
                to: '10',
                time: 2,
            },
            {
                form: '5',
                to: '11',
                time: 2,
            },
            {
                form: '5',
                to: '12',
                time: 2,
            },
            {
                form: '5',
                to: '13',
                time: 2,
            },
            {
                form: '5',
                to: '14',
                time: 2,
            },
            {
                form: '5',
                to: '15',
                time: 2,
            },
            {
                form: '5',
                to: '16',
                time: 2,
            },
            {
                form: '5',
                to: '17',
                time: 2,
            },
            {
                form: '5',
                to: '18',
                time: 3,
            },
            {
                form: '5',
                to: '19',
                time: 3,
            },
            {
                form: '5',
                to: '20',
                time: 4,
            },
            {
                form: '6',
                to: '7',
                time: 1,
            },
            {
                form: '6',
                to: '8',
                time: 1,
            },
            {
                form: '6',
                to: '9',
                time: 2,
            },
            {
                form: '6',
                to: '10',
                time: 2,
            },
            {
                form: '6',
                to: '11',
                time: 2,
            },
            {
                form: '6',
                to: '12',
                time: 2,
            },
            {
                form: '6',
                to: '13',
                time: 2,
            },
            {
                form: '6',
                to: '14',
                time: 2,
            },
            {
                form: '6',
                to: '15',
                time: 2,
            },
            {
                form: '6',
                to: '16',
                time: 2,
            },
            {
                form: '6',
                to: '17',
                time: 2,
            },
            {
                form: '6',
                to: '18',
                time: 3,
            },
            {
                form: '6',
                to: '19',
                time: 3,
            },
            {
                form: '6',
                to: '20',
                time: 4,
            },
            {
                form: '7',
                to: '9',
                time: 1,
            },
            {
                form: '7',
                to: '10',
                time: 1,
            },
            {
                form: '7',
                to: '11',
                time: 1,
            },
            {
                form: '7',
                to: '12',
                time: 1,
            },
            {
                form: '7',
                to: '13',
                time: 1,
            },
            {
                form: '7',
                to: '14',
                time: 1,
            },
            {
                form: '7',
                to: '15',
                time: 1,
            },
            {
                form: '7',
                to: '16',
                time: 1,
            },
            {
                form: '7',
                to: '17',
                time: 1,
            },
            {
                form: '7',
                to: '18',
                time: 2,
            },
            {
                form: '7',
                to: '19',
                time: 2,
            },
            {
                form: '7',
                to: '20',
                time: 3,
            },
            {
                form: '8',
                to: '9',
                time: 1,
            },
            {
                form: '8',
                to: '10',
                time: 1,
            },
            {
                form: '8',
                to: '11',
                time: 1,
            },
            {
                form: '8',
                to: '12',
                time: 1,
            },
            {
                form: '8',
                to: '13',
                time: 1,
            },
            {
                form: '8',
                to: '14',
                time: 1,
            },
            {
                form: '8',
                to: '15',
                time: 1,
            },
            {
                form: '8',
                to: '16',
                time: 1,
            },
            {
                form: '8',
                to: '17',
                time: 1,
            },
            {
                form: '8',
                to: '18',
                time: 2,
            },
            {
                form: '8',
                to: '19',
                time: 2,
            },
            {
                form: '8',
                to: '20',
                time: 3,
            },
            {
                form: '9',
                to: '18',
                time: 1,
            },
            {
                form: '9',
                to: '19',
                time: 1,
            },
            {
                form: '9',
                to: '20',
                time: 2,
            },
            {
                form: '10',
                to: '18',
                time: 1,
            },
            {
                form: '10',
                to: '19',
                time: 1,
            },
            {
                form: '10',
                to: '20',
                time: 2,
            },
            {
                form: '11',
                to: '18',
                time: 1,
            },
            {
                form: '11',
                to: '19',
                time: 1,
            },
            {
                form: '11',
                to: '20',
                time: 2,
            },
            {
                form: '12',
                to: '18',
                time: 1,
            },
            {
                form: '12',
                to: '19',
                time: 1,
            },
            {
                form: '12',
                to: '20',
                time: 2,
            },
            {
                form: '13',
                to: '18',
                time: 1,
            },
            {
                form: '13',
                to: '19',
                time: 1,
            },
            {
                form: '13',
                to: '20',
                time: 2,
            },
            {
                form: '14',
                to: '18',
                time: 1,
            },
            {
                form: '14',
                to: '19',
                time: 1,
            },
            {
                form: '14',
                to: '20',
                time: 2,
            },
            {
                form: '15',
                to: '18',
                time: 1,
            },
            {
                form: '15',
                to: '19',
                time: 1,
            },
            {
                form: '15',
                to: '20',
                time: 2,
            },
            {
                form: '16',
                to: '18',
                time: 1,
            },
            {
                form: '16',
                to: '19',
                time: 1,
            },
            {
                form: '16',
                to: '20',
                time: 2,
            },
            {
                form: '17',
                to: '18',
                time: 1,
            },
            {
                form: '17',
                to: '19',
                time: 1,
            },
            {
                form: '17',
                to: '20',
                time: 2,
            },
            {
                form: '18',
                to: '20',
                time: 1,
            },
            {
                form: '19',
                to: '20',
                time: 1,
            },
        ],
    },
    intervals: [],
    isDraw: false,
    path: [],
};

export default initialState;
