import { useState } from 'react';
import { TAddLine, TClearLine, TLine, TPushPoint, TUseDraw } from './type';
import { produce } from 'immer';
import usePoint from './usePoint';
import useSwitch from './useSwitch';

const useDraw: TUseDraw = () => {
    const point = usePoint();
    const [lines, setlines] = useState<TLine[]>([]);
    const switchPoint = useSwitch();

    const addLine: TAddLine = (x, y) => {
        const _point = point.getPoint(x, y);

        if (_point.center) {
            if (_point.center.yard === lines.at(-1)?.center.yard) {
                _point.time.h * 60 + _point.time.m >
                    lines.at(-1)!.endTiem.h * 60 + lines.at(-1)!.endTiem.m &&
                    setlines(
                        produce(draft => {
                            draft.at(-1)!.endTiem = _point.time;
                        }),
                    );
            } else {
                setlines(
                    produce(draft => {
                        if (draft.length) {
                            const endH = draft.at(-1)!.endTiem.h;
                            const endM = draft.at(-1)!.endTiem.m;

                            const m =
                                endM +
                                switchPoint.timePassed(
                                    draft.at(-1)!.center.track.id,
                                    _point.center!.track.id,
                                );
                            const h = m >= 60 ? endH + 1 : endH;

                            draft.push({
                                startTime: {
                                    h: h,
                                    m: m >= 60 ? m - 60 : m,
                                },
                                endTiem: {
                                    h: h,
                                    m: m >= 60 ? m - 60 : m,
                                },
                                center: _point.center!,
                            });
                        } else {
                            draft.push({
                                startTime: _point.time,
                                endTiem: _point.time,
                                center: _point.center!,
                            });
                        }
                    }),
                );
            }
        }
    };
    const pushPoint: TPushPoint = (x, y) => {
        const _point = point.getPoint(x, y);

        if (
            _point.time.h * 60 + _point.time.m >=
            (lines.at(-1)?.endTiem.h ?? 0) * 60 + (lines.at(-1)?.endTiem.m ?? 0)
        ) {
            setlines(
                produce(draft => {
                    draft.at(-1)!.endTiem = _point.time;
                }),
            );
        }
    };
    const clearLine: TClearLine = () => setlines([]);

    return {
        lines,
        addLine,
        pushPoint,
        clearLine,
    };
};

export default useDraw;
