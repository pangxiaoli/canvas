import { TPath } from '@/store/draw/initialState/type';

export const renderLines = (ctx: CanvasRenderingContext2D, path: TPath[]) => {
    path.forEach((i, index) => {
        i.lines.forEach((line, jndex) => {
            ctx.beginPath();
            ctx.beginPath();
            ctx.moveTo(line.startX, line.startY);
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 8;
            ctx.lineCap = 'round';
            ctx.lineTo(line.endX, line.endY);
            ctx.stroke();

            ctx.strokeStyle = 'red';
            ctx.lineWidth = 1;
            ctx.font = 'italic bold 24px Arial';
            ctx.clearRect(line.startX + 5, line.startY - 30, 90, 25);
            ctx.strokeText(`${index}-${jndex}`, line.startX + 5, line.startY - 5);
        });
    });
};
