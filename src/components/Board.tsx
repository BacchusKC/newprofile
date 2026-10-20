import styled from "styled-components";
import FlapRow from "./Flap";
import CodeView from "./CodeView";
import { Section } from "../data/sections";
import useFlipMode from "../hooks/useFlipMode";
import { clamp, scrub } from "../utils/flaps";
import { sourceFor } from "../utils/source";

const Panel = styled.section`
    position: relative;
    width: min(100%, 118vh);
    perspective: 1400px;
`;

const Face = styled.div`
    display: grid;
    gap: clamp(6px, 1vw, 12px);
    padding: clamp(10px, 1.6vw, 18px);
    border-radius: 6px;
    background: var(--panel);
    transform-origin: 50% 50%;
    backface-visibility: hidden;
`;

const Back = styled.div`
    position: absolute;
    inset: 0;
    transform-origin: 50% 50%;
    backface-visibility: hidden;
`;

type BoardProps = {
    from: Section;
    to: Section;
    progress: number;
    showing: Section;
    source: boolean;
    wave: number;
    still: boolean;
};

export default function Board({ from, to, progress, showing, source, wave, still }: BoardProps) {
    const mode = useFlipMode(source, still);
    const front = clamp(mode);
    const back = clamp(mode - 1);
    const code = sourceFor(showing.id);

    return (
        <Panel aria-label={source ? "Source code" : "Now showing"}>
            <Face
                style={{ transform: `rotateX(${front * 90}deg)`, visibility: front === 1 ? "hidden" : "visible" }}
                aria-hidden={source}
            >
                <FlapRow text={scrub(from.headline, to.headline, progress, 13)} width={13} label={showing.headline} wave={wave} still={still} />
                <FlapRow text={scrub(from.subline, to.subline, progress, 20)} width={20} label={showing.subline} wave={wave} still={still} />
            </Face>
            {mode > 1 && (
                <Back style={{ transform: `rotateX(${(back - 1) * 90}deg)` }}>
                    <CodeView file="src/data/sections.tsx" first={code.first} lines={code.lines} />
                </Back>
            )}
        </Panel>
    );
}
