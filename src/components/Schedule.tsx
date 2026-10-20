import { useState } from "react";
import styled from "styled-components";
import FlapRow from "./Flap";
import { Section } from "../data/sections";
import { departureTimes } from "../utils/time";

const List = styled.nav`
    display: grid;
    gap: 6px;

    .labels {
        display: grid;
        grid-template-columns: 5fr 8fr 8fr;
        gap: 10px;
        padding: 0 6px;
        font-size: 0.8rem;
        color: var(--muted);
    }

    button {
        all: unset;
        display: grid;
        grid-template-columns: 5fr 8fr 8fr;
        gap: 10px;
        cursor: pointer;
        padding: 6px;
        border-radius: 4px;
        --gap: 2px;
    }

    button:hover {
        background: var(--panel);
    }

    button:focus-visible {
        outline: 3px solid var(--signal);
    }

    button.boarding .status {
        --flap-ink: var(--signal);
    }

    @media (max-width: 520px) {
        .labels,
        button {
            grid-template-columns: 8fr 8fr;
        }

        .time {
            display: none;
        }
    }
`;

type ScheduleProps = {
    sections: Section[];
    current: number;
    onSelect: (index: number) => void;
    wave: number;
    still: boolean;
};

export default function Schedule({ sections, current, onSelect, wave, still }: ScheduleProps) {
    const [times] = useState(() => departureTimes(sections.length));

    return (
        <List aria-label="Sections">
            <div className="labels" aria-hidden="true">
                <span className="time">Time</span>
                <span>Destination</span>
                <span>Status</span>
            </div>
            {sections.map((section, i) => {
                const status = i < current ? "DEPARTED" : i === current ? "BOARDING" : "ON TIME";
                return (
                    <button
                        key={section.id}
                        type="button"
                        className={i === current ? "boarding" : ""}
                        aria-current={i === current ? "step" : undefined}
                        onClick={() => onSelect(i)}
                    >
                        <FlapRow className="time" text={times[i]} width={5} wave={wave} still={still} />
                        <FlapRow text={section.stop} width={8} label={`Go to ${section.stop.toLowerCase()}`} wave={wave} still={still} />
                        <FlapRow className="status" text={status} width={8} label={status.toLowerCase()} wave={wave} still={still} />
                    </button>
                );
            })}
        </List>
    );
}
