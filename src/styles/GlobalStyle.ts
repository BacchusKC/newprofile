import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --bg: #111213;
        --panel: #1a1b1e;
        --flap-top: #2a2b2f;
        --flap-bottom: #232427;
        --flap-ink: #f1ead6;
        --hinge: #08090a;
        --ink: #ebe7de;
        --muted: #8f8b82;
        --rule: #2c2d31;
        --signal: #f5b52e;
        --code-bg: #0b0c0d;
        --code-ink: #d9d5cb;
        --code-dim: #4d4c48;
        --code-tag: #8fb8ff;
        --code-key: #f5b52e;
        --code-str: #a8d8a0;
        --code-num: #e59a7a;
        --flip-ms: 60ms;
        color-scheme: dark;
    }

    :root[data-theme="light"] {
        --bg: #e7e5df;
        --panel: #d8d5cd;
        --flap-top: #fcfbf7;
        --flap-bottom: #f1efe9;
        --flap-ink: #17181a;
        --hinge: #b9b5ab;
        --ink: #1b1c1e;
        --muted: #625f58;
        --rule: #c6c2b8;
        --signal: #c9401a;
        --code-bg: #f7f5ef;
        --code-ink: #2a2b2e;
        --code-dim: #aaa69c;
        --code-tag: #2f5fa8;
        --code-key: #b3471d;
        --code-str: #3c7a3a;
        --code-num: #8a4fb0;
        color-scheme: light;
    }

    *, *::before, *::after {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        background: var(--bg);
        color: var(--ink);
        font-family: "Barlow", system-ui, sans-serif;
        font-size: 1.0625rem;
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
    }

    a {
        color: inherit;
    }

    :focus-visible {
        outline: 3px solid var(--signal);
        outline-offset: 3px;
        border-radius: 2px;
    }

    @keyframes fold {
        to { transform: rotateX(-90deg); }
    }

    @keyframes unfold {
        from { transform: rotateX(90deg); }
        to { transform: none; }
    }

    ::view-transition-old(root),
    ::view-transition-new(root) {
        animation: none;
        mix-blend-mode: normal;
    }

    @media (prefers-reduced-motion: reduce) {
        :root {
            --flip-ms: 0ms;
        }
    }
`;

export default GlobalStyle;
