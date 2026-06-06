export const csvFieldPricingCode = 0
export const csvFieldHomeName = 1
export const csvFieldRoomName = 2
export const csvFieldRadPrice = 3
export const csvFieldDapPrice = 4

export const priceUpdated = (initialPrice: string, updatedPrice: string) => {
    return initialPrice != updatedPrice && isFinite(Number(updatedPrice))
}
