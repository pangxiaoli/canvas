import { TSize } from '../../useCanvas/utils/type';

const isIncontainer = (e: MouseEvent, size: TSize) => {
    if (
        e.offsetX < size.padding + size.tableW &&
        e.offsetX >= size.padding + size.captionW.reduce((a, b) => a + b, 0) &&
        e.offsetY > size.padding + size.titleH + size.rawH / 2 &&
        e.offsetY < size.padding + size.titleH + size.tableH
    ) {
        return true;
    }

    return false;
};

const renderHelp = (e: MouseEvent, ref: React.RefObject<HTMLCanvasElement> | null, size: TSize) => {
    const ctx = ref?.current?.getContext('2d');

    if (ctx) {
        if (isIncontainer(e, size)) {
            ctx.setLineDash([5, 5]);
            ctx.strokeStyle = 'grey';

            ctx.clearRect(0, 0, size.canvasW, size.canvasH);

            ctx.beginPath();
            ctx.moveTo(e.offsetX, size.padding + size.titleH);
            ctx.lineTo(e.offsetX, size.padding + size.titleH + size.tableH);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(size.padding, e.offsetY);
            ctx.lineTo(size.padding + size.tableW, e.offsetY);
            ctx.stroke();

            ctx.setLineDash([]);
        } else {
            ctx.clearRect(0, 0, size.canvasW, size.canvasH);
        }
    }
};

export default renderHelp;
