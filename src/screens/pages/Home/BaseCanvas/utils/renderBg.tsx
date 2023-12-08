import { TInserval } from '@/store/draw/initialState/type';
import { TSize } from '../../useCanvas/utils/type';

export const renderBg = (canvas: HTMLCanvasElement, size: TSize) => {
    const {
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
    } = size;
    /** 股道坐标 */
    const intervals: TInserval[] = [];

    const dataSource = data.list;
    const time = data.class === '0' ? 20 : 6;

    canvas.style.height = domH + 'px';
    canvas.style.width = domW + 'px';

    canvas.height = canvasH;
    canvas.width = canvasW;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        return {
            intervals,
        };
    }

    ctx.scale(dpi, dpi);

    ctx.beginPath();
    ctx.strokeStyle = '#008000';
    ctx.moveTo(padding, padding);
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(padding, padding + titleH, tableW, tableH);
    ctx.rect(padding, padding + titleH, tableW, tableH);
    ctx.stroke();

    let dh = padding + titleH + rawH / 2;

    ctx.beginPath();
    ctx.moveTo(padding, dh);
    ctx.strokeStyle = '#008000';
    ctx.lineTo(padding + tableW, dh);
    ctx.stroke();

    /**
     * 股道
     */
    dataSource.forEach(i => {
        const [x0, y0] = [padding, i.lines.length * rawH + dh];
        ctx.beginPath();
        ctx.moveTo(x0, y0);

        ctx.strokeStyle = 'black';
        ctx.strokeText(i.name, x0 + 5, y0 - (i.lines.length / 2) * rawH + 10);

        ctx.strokeStyle = '#008000';
        ctx.lineTo(x0 + tableW, y0);
        ctx.stroke();

        i.lines.forEach((j, index) => {
            const [jx0, jy0] = [padding + captionW[0], (index + 1) * rawH + dh];

            ctx.beginPath();
            ctx.moveTo(jx0, jy0);

            ctx.strokeStyle = 'blue';
            ctx.strokeText(j, jx0 + 10, jy0 - rawH / 2 + 10);

            ctx.strokeStyle = '#008000';
            ctx.lineTo(x0 + tableW, jy0);
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = 'black';
            ctx.moveTo(jx0 + captionW[1], jy0 - rawH / 2);
            ctx.lineTo(x0 + tableW, jy0 - rawH / 2);
            ctx.stroke();

            intervals.push({
                start: index * rawH + dh,
                end: jy0,
                name: j,
                area: i.name,
                center: jy0 - rawH / 2,
            });
        });

        dh += i.lines.length * rawH;
    });

    /**
     * 第一条竖线
     */
    ctx.beginPath();
    ctx.strokeStyle = '#008000';
    ctx.moveTo(padding + captionW[0], padding + titleH);
    ctx.lineTo(padding + captionW[0], padding + titleH + tableH);
    ctx.stroke();

    /**
     * 时间
     */
    Array(13)
        .fill(1)
        .forEach((_, index) => {
            const [x, y] = [padding + captionW[0] + captionW[1] + index * colW, padding + titleH];
            ctx.beginPath();
            ctx.strokeStyle = 'black';
            ctx.strokeText(
                time + index >= 24 ? `${time + index - 24} : 00` : `${time + index} : 00`,
                x - 15,
                y - 5,
            );
            ctx.moveTo(x, y);
            ctx.strokeStyle = '#008000';
            ctx.lineTo(x, y + tableH);
            ctx.stroke();

            Array(5)
                .fill(1)
                .forEach((_, jndex) => {
                    ctx.beginPath();
                    ctx.strokeStyle = '#008000';
                    ctx.moveTo(x + ((jndex + 1) * colW) / 6, y + rawH / 2 - 5);
                    ctx.lineTo(x + ((jndex + 1) * colW) / 6, y + rawH / 2);
                    ctx.fill();
                    ctx.stroke();
                });
        });

    return {
        intervals,
        ctx,
    };
};
