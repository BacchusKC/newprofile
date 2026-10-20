export const formatTime = (date: Date) =>
    `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

export function departureTimes(count: number) {
    const start = new Date();
    start.setMinutes(Math.ceil((start.getMinutes() + 1) / 15) * 15, 0, 0);
    return Array.from({ length: count }, (_, i) => formatTime(new Date(start.getTime() + i * 15 * 60000)));
}
