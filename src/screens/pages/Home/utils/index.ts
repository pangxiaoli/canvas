import { TCalcCanvas } from './type';

const calcCanvas: TCalcCanvas = data => {
    const titleH = 10;

    const rawH = 70;
    const colW = 300;
    const colNum = 14;
    const padding = 30;
    const captionW = [40, 50];

    const tableH = data.yards.reduce((a, b) => a + b.tracks.length, 0.5) * rawH;
    const tableW = colNum * colW + captionW.reduce((a, b) => a + b);

    const domH = tableH + padding * 2 + titleH;
    const domW = tableW + padding * 2;

    return {
        titleH,
        rawH,
        colW,
        colNum,
        tableH,
        tableW,
        domH,
        domW,
        padding,
        captionW,

        data,
    };
};

export default calcCanvas;
