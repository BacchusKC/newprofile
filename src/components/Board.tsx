import styled from "styled-components";
import FlapRow from "./Flap";
import { Section } from "../data/sections";
import { scrub } from "../utils/flaps";

const Panel = styled.section`
    display: grid;
    gap: clamp(6px, 1vw, 12px);
    width: min(100%, 118vh);
    padding: clamp(10px, 1.6vw, 18px);
    border-radius: 6px;
    background: var(--panel);
`;

type BoardProps = {
    from: Section;
    to: Section;
    progress: number;
    showing: Section;
    wave: number;
    still: boolean;
};

export default function Board({ from, to, progress, showing, wave, still }: BoardProps) {
    return (
        <Panel aria-label="Now showing">
            <FlapRow
                text={scrub(from.headline, to.headline, progress, 13)}
                width={13}
                label={showing.headline}
                wave={wave}
                still={still}
            />
            <FlapRow
                text={scrub(from.subline, to.subline, progress, 20)}
                width={20}
                label={showing.subline}
                wave={wave}
                still={still}
            />
        </Panel>
    );
}
