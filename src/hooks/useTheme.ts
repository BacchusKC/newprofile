import { useState } from "react";

export type Theme = "light" | "dark";

const getTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

const saveTheme = (theme: Theme) => {
    document.documentElement.dataset.theme = theme;
    try {
        localStorage.setItem("theme", theme);
    } catch {}
};

export default function useTheme(reducedMotion: boolean) {
    const [theme, setTheme] = useState<Theme>(getTheme);
    const [wave, setWave] = useState(0);

    const toggleTheme = (x: number, y: number) => {
        const next = getTheme() === "dark" ? "light" : "dark";

        const swap = () => {
            saveTheme(next);
            setTheme(next);
        };

        if (reducedMotion || !document.startViewTransition) {
            swap();
            return;
        }

        const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
        const transition = document.startViewTransition(swap);

        transition.ready.then(() => {
            document.documentElement.animate(
                { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
                { duration: 650, easing: "cubic-bezier(.6, 0, .3, 1)", pseudoElement: "::view-transition-new(root)" }
            );
        });

        transition.finished.then(() => setWave((w) => w + 1));
    };

    return { theme, toggleTheme, wave };
}
