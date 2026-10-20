import { useState } from "react";
import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import Header from "./components/Header";
import Board from "./components/Board";
import Schedule from "./components/Schedule";
import { sections } from "./data/sections";
import useScrollProgress from "./hooks/useScrollProgress";
import useReducedMotion from "./hooks/useReducedMotion";
import useTheme from "./hooks/useTheme";
import { clamp, ease } from "./utils/flaps";

const last = sections.length - 1;
const edge = 0.3;

function getStop(progress: number) {
    const position = clamp(progress * (last + edge * 2) - edge, 0, last);
    const index = Math.min(last - 1, Math.floor(position));
    const flip = ease(clamp((position - index - 0.2) / 0.6));
    return { index, flip, current: flip < 0.5 ? index : index + 1 };
}

function goToStop(index: number) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: ((index + edge) / (last + edge * 2)) * max, behavior: "smooth" });
}

const ScrollSpace = styled.div`
    height: ${sections.length * 120}vh;
`;

const Screen = styled.div`
    position: fixed;
    inset: 0;
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: minmax(0, 1fr);
    padding-left: max(16px, env(safe-area-inset-left, 0px));
    padding-right: max(16px, env(safe-area-inset-right, 0px));
`;

const Main = styled.main`
    display: grid;
    align-content: safe center;
    gap: clamp(1rem, 3.5vh, 2rem);
    width: 100%;
    max-width: 76rem;
    min-height: 0;
    margin: 0 auto;
    padding-block: clamp(1rem, 4vh, 2.5rem) max(1rem, env(safe-area-inset-bottom, 0px));
`;

const Columns = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
    gap: clamp(1.25rem, 4vw, 3.5rem);
    align-items: start;

    @media (max-width: 760px) {
        grid-template-columns: minmax(0, 1fr);
    }
`;

const Stack = styled.div`
    display: grid;
`;

const Content = styled.div`
    grid-area: 1 / 1;
    max-width: 34rem;
    visibility: hidden;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.35s ease-out, transform 0.35s ease-out, visibility 0s 0.35s;

    &.showing {
        visibility: visible;
        opacity: 1;
        transform: none;
        transition: opacity 0.35s ease-out, transform 0.35s ease-out, visibility 0s;
    }

    @media (prefers-reduced-motion: reduce) {
        transition: none;

        &.showing {
            transition: none;
        }
    }

    p {
        margin: 0 0 0.75rem;
    }

    .lede {
        font-size: clamp(1.1rem, 1.8vw, 1.35rem);
        line-height: 1.45;
    }

    .hint {
        color: var(--muted);
    }

    ul {
        display: grid;
        gap: 0.8rem;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    a {
        font-weight: 600;
        text-decoration-color: var(--signal);
        text-decoration-thickness: 2px;
        text-underline-offset: 4px;
    }

    .projects span {
        display: block;
        color: var(--muted);
    }

    .projects small {
        display: block;
        margin-top: 0.2rem;
        font-family: "Barlow Condensed", sans-serif;
        font-size: 0.95rem;
        font-weight: 600;
        color: var(--signal);
    }

    .contact li {
        font-size: clamp(1.15rem, 2vw, 1.4rem);
    }
`;

export default function App() {
    const progress = useScrollProgress();
    const reducedMotion = useReducedMotion();
    const { theme, toggleTheme, wave } = useTheme(reducedMotion);
    const [source, setSource] = useState(false);

    const { index, flip, current } = getStop(progress);
    const showing = sections[current];

    return (
        <>
            <GlobalStyle />
            <ScrollSpace />
            <Screen>
                <Header
                    theme={theme}
                    onToggleTheme={toggleTheme}
                    source={source}
                    onToggleSource={() => setSource((on) => !on)}
                    wave={wave}
                    still={reducedMotion}
                />
                <Main>
                    <Board
                        from={sections[index]}
                        to={sections[index + 1]}
                        progress={flip}
                        showing={showing}
                        source={source}
                        wave={wave}
                        still={reducedMotion}
                    />
                    <Columns>
                        <Stack>
                            {sections.map((section) => (
                                <Content
                                    key={section.id}
                                    id={section.id}
                                    className={section.id === showing.id ? "showing" : ""}
                                    aria-hidden={section.id !== showing.id}
                                >
                                    {section.body}
                                </Content>
                            ))}
                        </Stack>
                        <Schedule
                            sections={sections}
                            current={current}
                            onSelect={goToStop}
                            wave={wave}
                            still={reducedMotion}
                        />
                    </Columns>
                </Main>
            </Screen>
        </>
    );
}
