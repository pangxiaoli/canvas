import { TDraw } from './type';

const initialState: TDraw = {
    baseData: {
        date: '2020/12/26',
        class: '0',
        group: '乙',
        admin: '',
        list: [
            { name: '到达', lines: ['上海南'] },
            { name: '应急线', lines: ['D19'] },
            { name: '检修线', lines: ['D6', 'D7', 'D8', 'D9'] },
            { name: '清洗线', lines: ['D25', 'D26'] },
            {
                name: '存车线',
                lines: ['D10', 'D11', 'D12', 'D13', 'D14', 'D15', 'D16', 'D17', 'D18'],
            },
            { name: '临修线', lines: ['D3', 'D4'] },
            { name: '出发', lines: ['上海南'] },
        ],
    },
    intervals: [],
    isDraw: false,
    path: [],
};

export default initialState;
