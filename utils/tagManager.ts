export const addTagManagerEvent = (
    event: string,
    data: { [key: string]: any }
) => {
    if ((window as any).dataLayer) {
        ;(window as any).dataLayer.push({
            event,
            ...data,
        })
    }
}

export const resetTagManagerEvents = () => {
    if ((window as any).dataLayer) {
        ;(window as any).dataLayer.push(function (this: any) {
            this.reset()
        })
    }
}
