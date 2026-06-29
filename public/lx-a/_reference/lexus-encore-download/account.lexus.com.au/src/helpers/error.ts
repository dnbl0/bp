export const normalizeError = (error: unknown): Error => {
    if (error instanceof Error) {
        return error;
    }

    if (typeof error === "object" && error !== null) {
        const errorRecord = error as Record<string, unknown>;
        const message =
            typeof errorRecord.message === "string"
                ? errorRecord.message
                : typeof errorRecord.description === "string"
                ? errorRecord.description
                : JSON.stringify(errorRecord);
        return Object.assign(new Error(message), errorRecord);
    }

    return new Error(String(error));
};
