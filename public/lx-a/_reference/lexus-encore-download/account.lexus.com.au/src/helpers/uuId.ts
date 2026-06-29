export const addUuIdQs = (apiUrl: string) => {
    const constructedUrl = new URL(apiUrl);
    const id = globalThis.crypto?.randomUUID() ?? null;
    if (id) constructedUrl.searchParams.set("uuid", id);

    return constructedUrl.toString();
};
