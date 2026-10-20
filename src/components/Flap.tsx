import { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { pad } from "../utils/flaps";

const Cell = styled.span`
    position: relative;
    display: block;
    aspect-ratio: 0.7;
    perspective: 260px;
    font-family: "Barlow Condensed", "Arial Narrow", sans-serif;
    font-weight: 600;
    font-size: calc(var(--cell, 1em) * 1.12);
    line-height: 1;
    color: var(--flap-ink);
    user-select: none;

    &::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: calc(50% - 0.5px);
        height: 1px;
        background: var(--hinge);
        z-index: 3;
    }
`;

const Half = styled.span<{ $top?: boolean }>`
    position: absolute;
    left: 0;
    right: 0;
    height: 50%;
    overflow: hidden;
    backface-visibility: hidden;
    top: ${(p) => (p.$top ? 0 : "auto")};
    bottom: ${(p) => (p.$top ? "auto" : 0)};
    border-radius: ${(p) => (p.$top ? "3px 3px 0 0" : "0 0 3px 3px")};
    background: ${(p) => (p.$top ? "var(--flap-top)" : "var(--flap-bottom)")};
    transform-origin: ${(p) => (p.$top ? "50% 100%" : "50% 0")};

    span {
        position: absolute;
        left: 0;
        right: 0;
        height: 200%;
        display: grid;
        place-items: center;
        top: ${(p) => (p.$top ? 0 : "auto")};
        bottom: ${(p) => (p.$top ? "auto" : 0)};
    }

    &.fold {
        z-index: 2;
        animation: fold var(--flip-ms) ease-in forwards;
    }

    &.unfold {
        z-index: 2;
        animation: unfold var(--flip-ms) ease-out var(--flip-ms) both;
    }
`;

type FlapProps = {
    char: string;
    wave?: number;
    delay?: number;
    still?: boolean;
};

const Flap = memo(({ char, wave = 0, delay = 0, still = false }: FlapProps) => {
    const [current, setCurrent] = useState(char);
    const [previous, setPrevious] = useState(char);
    const [flips, setFlips] = useState(0);
    const lastWave = useRef(wave);

    useEffect(() => {
        if (char === current) return;
        setPrevious(current);
        setCurrent(char);
        if (!still) setFlips((n) => n + 1);
    }, [char, current, still]);

    useEffect(() => {
        if (wave === lastWave.current || still) return;
        lastWave.current = wave;
        const timer = setTimeout(() => {
            setPrevious(current);
            setFlips((n) => n + 1);
        }, delay);
        return () => clearTimeout(timer);
    }, [wave]);

    const flipping = flips > 0;

    return (
        <Cell aria-hidden="true">
            <Half $top>
                <span>{current}</span>
            </Half>
            <Half>
                <span>{flipping ? previous : current}</span>
            </Half>
            {flipping && (
                <>
                    <Half $top className="fold" key={`fold-${flips}`}>
                        <span>{previous}</span>
                    </Half>
                    <Half className="unfold" key={`unfold-${flips}`} onAnimationEnd={() => setFlips(0)}>
                        <span>{current}</span>
                    </Half>
                </>
            )}
        </Cell>
    );
});

const Row = styled.span<{ $width: number }>`
    position: relative;
    display: grid;
    grid-template-columns: repeat(${(p) => p.$width}, minmax(0, 1fr));
    gap: var(--gap, 3px);
    container-type: inline-size;
    --cell: calc(100cqi / ${(p) => p.$width});
`;

const ScreenReaderText = styled.span`
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
`;

type FlapRowProps = {
    text: string;
    width: number;
    label?: string;
    wave?: number;
    still?: boolean;
    className?: string;
};

export default function FlapRow({ text, width, label, wave, still, className }: FlapRowProps) {
    return (
        <Row $width={width} className={className}>
            <ScreenReaderText>{label ?? text.trim()}</ScreenReaderText>
            {pad(text, width)
                .split("")
                .map((char, i) => (
                    <Flap key={i} char={char} wave={wave} delay={i * 28} still={still} />
                ))}
        </Row>
    );
}
