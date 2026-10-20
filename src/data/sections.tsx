import { ReactNode } from "react";

export type Section = {
    id: string;
    stop: string;
    headline: string;
    subline: string;
    body: ReactNode;
};

export const sections: Section[] = [
    {
        id: "hello",
        stop: "HELLO",
        headline: "TRAVIS MORRIS",
        subline: "SR SOFTWARE ENGINEER",
        body: (
            <>
                <p className="lede">I build web apps from the interface down to the database.</p>
                <p className="hint">Scroll to depart.</p>
            </>
        ),
    },
    {
        id: "about",
        stop: "ABOUT",
        headline: "ABOUT",
        subline: "KU GRAD, WEB BUILDER",
        body: (
            <p className="lede">
                I'm a senior software engineer with a soft spot for front-end design. I studied at the University of
                Kansas, and I've been writing code and learning new things ever since.
            </p>
        ),
    },
    {
        id: "work",
        stop: "WORK",
        headline: "WORK",
        subline: "SELECTED PROJECTS",
        body: (
            <ul className="projects">
                <li>
                    <a href="https://bacchuspethealth.com">Bacchus Pet Health</a>
                    <span>Track your pet's health in one place: daily care, vet records, appointments, and sharing with sitters.</span>
                    <small>React, TypeScript, Hono, Postgres, Drizzle, Vercel</small>
                </li>
                <li>
                    <a href="https://whatsplaying.live">What's Playing</a>
                    <span>What's in theaters and on TV right now, with trailers, critic scores, and where to stream.</span>
                    <small>React, TypeScript, TanStack Query, Vercel Functions</small>
                </li>
                <li>
                    <a href="https://github.com/BacchusKC/MegaMatch">Mega Match</a>
                    <span>A React memory game starring the Robot Masters.</span>
                </li>
            </ul>
        ),
    },
    {
        id: "contact",
        stop: "CONTACT",
        headline: "CONTACT",
        subline: "SAY HELLO ANY TIME",
        body: (
            <ul className="contact">
                <li>
                    <a href="mailto:TravisMorrisKC@gmail.com">TravisMorrisKC@gmail.com</a>
                </li>
                <li>
                    <a href="https://github.com/BacchusKC">GitHub</a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/BacchusKC/">LinkedIn</a>
                </li>
            </ul>
        ),
    },
];
