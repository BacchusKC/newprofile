import { useEffect, useRef, useState } from "react";

export default function useFlipMode(on: boolean, still: boolean) {
    const [mode, setMode] = useState(on ? 2 : 0);
    const current = useRef(mode);

    useEffect(() => {
        const target = on ? 2 : 0;
        const from = current.current;

        if (still || from === target) {
            current.current = target;
            setMode(target);
            return;
        }

        const duration = Math.abs(target - from) * 550;
        const start = performance.now();
        let frame = 0;

        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            current.current = from + (target - from) * t;
            setMode(current.current);
            if (t < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [on, still]);

    return mode;
}
