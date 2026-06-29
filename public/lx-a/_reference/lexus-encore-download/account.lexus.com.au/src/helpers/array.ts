export const takeLast = <T>(arr: T[], n: number): T[] => arr.slice(arr.length - Math.min(n, arr.length));
