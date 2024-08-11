export const fromDate = (date: Date): string => {
    return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}