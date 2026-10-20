import { ReactNode } from "react";
import styled from "styled-components";

const pattern = /("(?:[^"\\]|\\.)*")|(<\/?[A-Za-z][\w.]*|\/?>)|([A-Za-z]+(?=:))|(\b\d+\b)/g;

function highlight(line: string) {
    const parts: ReactNode[] = [];
    let last = 0;

    for (const match of line.matchAll(pattern)) {
        const at = match.index ?? 0;
        if (at > last) parts.push(line.slice(last, at));
        const kind = match[1] ? "str" : match[2] ? "tag" : match[3] ? "key" : "num";
        parts.push(
            <span key={at} className={kind}>
                {match[0]}
            </span>
        );
        last = at + match[0].length;
    }

    if (last < line.length) parts.push(line.slice(last));
    return parts;
}

const Box = styled.div`
    position: absolute;
    inset: 0;
    overflow: auto;
    overscroll-behavior: contain;
    border-radius: 6px;
    background: var(--code-bg);
    color: var(--code-ink);
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: clamp(0.7rem, 1.1vw, 0.82rem);
    line-height: 1.65;

    pre {
        margin: 0;
        padding: 0.9rem 0;
        min-width: max-content;
    }

    .line {
        display: grid;
        grid-template-columns: 3.2rem auto;
        padding-right: 1.2rem;
    }

    .number {
        padding-right: 1rem;
        text-align: right;
        color: var(--code-dim);
        user-select: none;
    }

    .str {
        color: var(--code-str);
    }

    .tag {
        color: var(--code-tag);
    }

    .key {
        color: var(--code-key);
    }

    .num {
        color: var(--code-num);
    }
`;

const File = styled.span`
    position: sticky;
    top: 0;
    float: right;
    margin: 0.5rem 0.6rem 0 0;
    padding: 0.1rem 0.5rem;
    border-radius: 4px;
    background: var(--panel);
    color: var(--muted);
    font-size: 0.72rem;
`;

type CodeViewProps = {
    file: string;
    first: number;
    lines: string[];
};

export default function CodeView({ file, first, lines }: CodeViewProps) {
    return (
        <Box tabIndex={0} aria-label={`Source code from ${file}`}>
            <File>{file}</File>
            <pre>
                <code>
                    {lines.map((line, i) => (
                        <span className="line" key={i}>
                            <span className="number">{first + i}</span>
                            <span>{highlight(line)}</span>
                        </span>
                    ))}
                </code>
            </pre>
        </Box>
    );
}
