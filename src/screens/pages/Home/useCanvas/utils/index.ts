import { TCalcCanvas } from './type';

const titleH = 10;

const rawH = 70;
const colW = 300;
const padding = 20;
const captionW = [40, 50];

const dpi = window.devicePixelRatio || 1;

const calcCanvas: TCalcCanvas = data => {
    const tableH = data.list.reduce((a, b) => a + b.lines.length, 0.5) * rawH;
    const tableW = 12 * colW + captionW.reduce((a, b) => a + b);

    const domH = tableH + padding * 2 + titleH;
    const domW = tableW + padding * 2;

    const canvasH = Math.floor(domH * dpi);
    const canvasW = Math.floor(domW * dpi);

    return {
        titleH,
        rawH,
        colW,
        tableH,
        tableW,
        domH,
        domW,
        canvasH,
        canvasW,
        padding,
        dpi,
        captionW,

        data,
    };
};

export default calcCanvas;
