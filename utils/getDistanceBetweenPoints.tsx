import { CmsLocation } from '../types/contentful-cms-types'

export const getDistanceBetweenPoints = (
    mk1: CmsLocation,
    mk2: CmsLocation
) => {
    var R = 6371.071 // Radius of the Earth in kilometres
    var rlat1 = mk1.lat! * (Math.PI / 180) // Convert degrees to radians
    var rlat2 = mk2.lat! * (Math.PI / 180) // Convert degrees to radians
    var difflat = rlat2 - rlat1 // Radian difference (latitudes)
    var difflon = (mk2.lon! - mk1.lon!) * (Math.PI / 180) // Radian difference (longitudes)

    var d =
        2 *
        R *
        Math.asin(
            Math.sqrt(
                Math.sin(difflat / 2) * Math.sin(difflat / 2) +
                    Math.cos(rlat1) *
                        Math.cos(rlat2) *
                        Math.sin(difflon / 2) *
                        Math.sin(difflon / 2)
            )
        )
    return d
}

/*
 * This is an alternative version of the above function that takes two objects
 * with lat and lng properties instead of a CmsLocation object.
 * This is useful when you want to use the function in a component that doesn't
 * have access to the CmsLocation type.
 */
export const getDistanceBetweenPointsAlt = (
    mk1: { lat: number; lng: number },
    mk2: { lat: number; lng: number }
) => {
    var R = 6371.071 // Radius of the Earth in kilometres
    var rlat1 = mk1.lat * (Math.PI / 180) // Convert degrees to radians
    var rlat2 = mk2.lat * (Math.PI / 180) // Convert degrees to radians
    var difflat = rlat2 - rlat1 // Radian difference (latitudes)
    var difflon = (mk2.lng - mk1.lng) * (Math.PI / 180) // Radian difference (longitudes)

    var d =
        2 *
        R *
        Math.asin(
            Math.sqrt(
                Math.sin(difflat / 2) * Math.sin(difflat / 2) +
                    Math.cos(rlat1) *
                        Math.cos(rlat2) *
                        Math.sin(difflon / 2) *
                        Math.sin(difflon / 2)
            )
        )
    return d
}
