import styled from "styled-components";
import FlapRow from "./Flap";
import useClock from "../hooks/useClock";
import { Theme } from "../hooks/useTheme";
import { formatTime } from "../utils/time";

const Bar = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    width: 100%;
    max-width: 76rem;
    margin: 0 auto;
    padding-block: max(14px, env(safe-area-inset-top, 0px)) 14px;
    border-bottom: 1px solid var(--rule);
`;

const Brand = styled.div`
    display: grid;
    line-height: 1.1;

    strong {
        font-family: "Barlow Condensed", sans-serif;
        font-size: 1.35rem;
        font-weight: 700;
    }

    span {
        font-size: 0.85rem;
        color: var(--muted);
    }
`;

const Right = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const Clock = styled.div`
    width: 5.2rem;
    --gap: 2px;
`;

const Toggle = styled.button`
    all: unset;
    cursor: pointer;
    display: inline-flex;
    border: 1px solid var(--rule);
    border-radius: 999px;
    padding: 3px;
    font-size: 0.85rem;
    font-weight: 600;

    span {
        padding: 0.3rem 0.75rem;
        border-radius: 999px;
        color: var(--muted);
    }

    span.active {
        background: var(--ink);
        color: var(--bg);
    }

    &:focus-visible {
        outline: 3px solid var(--signal);
        outline-offset: 3px;
    }
`;

type HeaderProps = {
    theme: Theme;
    onToggleTheme: (x: number, y: number) => void;
    wave: number;
    still: boolean;
};

export default function Header({ theme, onToggleTheme, wave, still }: HeaderProps) {
    const now = useClock();
    const time = formatTime(now);

    return (
        <Bar>
            <Brand>
                <strong>travismorris.io</strong>
                <span>Departures</span>
            </Brand>
            <Right>
                <Clock>
                    <FlapRow text={time} width={5} label={`Local time ${time}`} wave={wave} still={still} />
                </Clock>
                <Toggle
                    type="button"
                    aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    onClick={(e) => {
                        const box = e.currentTarget.getBoundingClientRect();
                        onToggleTheme(box.left + box.width / 2, box.top + box.height / 2);
                    }}
                >
                    <span className={theme === "light" ? "active" : ""}>Light</span>
                    <span className={theme === "dark" ? "active" : ""}>Dark</span>
                </Toggle>
            </Right>
        </Bar>
    );
}
