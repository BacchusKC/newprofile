import raw from "../data/sections.tsx?raw";

const lines = raw.split("\n");

export function sourceFor(id: string) {
    const idLine = lines.findIndex((line) => line.includes(`id: "${id}"`));
    const start = idLine - 1;
    const indent = lines[start].match(/^\s*/)?.[0] ?? "";
    let end = start + 1;

    while (end < lines.length && !lines[end].startsWith(`${indent}}`)) end++;

    return {
        first: start + 1,
        lines: lines.slice(start, end + 1).map((line) => line.slice(indent.length)),
    };
}
