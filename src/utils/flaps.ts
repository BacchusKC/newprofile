export const DRUM = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.,:'&/@";

export const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));

export const ease = (t: number) => t * t * (3 - 2 * t);

export const pad = (text: string, width: number) => text.toUpperCase().padEnd(width).slice(0, width);

const position = (char: string) => Math.max(0, DRUM.indexOf(char));

export function scrub(from: string, to: string, t: number, width: number) {
    const start = pad(from, width);
    const end = pad(to, width);
    let result = "";

    for (let i = 0; i < width; i++) {
        const a = position(start[i]);
        const steps = (position(end[i]) - a + DRUM.length) % DRUM.length;
        const local = clamp((t - (i / width) * 0.4) / 0.6);
        result += DRUM[(a + Math.round(steps * local)) % DRUM.length];
    }

    return result;
}
