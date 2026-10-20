const sign = [
    "┌─────────────────────────────────┐",
    "│ T H A N K S   F O R             │",
    "│ L O O K I N G   U N D E R       │",
    "│ T H E   H O O D                 │",
    "└─────────────────────────────────┘",
].join("\n");

export default function consoleSign() {
    console.log(
        `%c${sign}`,
        "font-family: monospace; font-size: 13px; line-height: 1.3; color: #f1ead6; background: #1a1b1e; padding: 8px 4px;"
    );
    console.log(
        "%cThe whole thing is open source: https://github.com/BacchusKC/newprofile\nSay hi: TravisMorrisKC@gmail.com",
        "font-family: sans-serif; font-size: 12px; color: #f5b52e;"
    );
}
