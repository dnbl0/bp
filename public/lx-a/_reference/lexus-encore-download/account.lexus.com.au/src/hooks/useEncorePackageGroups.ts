import { isAfter, isBefore } from "date-fns";
import { parseDateString } from "Helpers/dateTime";
import { isEncorePackageErrorProp } from "Helpers/vehicle";
import { useMemo } from "react";
import { EncorePackageProps, EncorePackageErrorProp } from "Types/vehicle";

type PackageGroups = {
    currentEncorePackage: EncorePackageProps | EncorePackageErrorProp | null;
    upcomingPackages: EncorePackageProps[];
    expiredPackages: EncorePackageProps[];
};

const getPackageExpiryTime = (pkg: EncorePackageProps, fallback: number): number =>
    parseDateString(pkg.packageExpiryDate)?.getTime() ?? fallback;

const getPackageStartTime = (pkg: EncorePackageProps, fallback: number): number =>
    parseDateString(pkg.packageStartDate)?.getTime() ?? fallback;

export const getEncorePackageGroups = (
    encorePackage: EncorePackageProps | EncorePackageProps[] | EncorePackageErrorProp | null | undefined,
    now = new Date()
): PackageGroups => {
    if (!Array.isArray(encorePackage)) {
        if (isEncorePackageErrorProp(encorePackage)) {
            return {
                currentEncorePackage: encorePackage,
                upcomingPackages: [],
                expiredPackages: [],
            };
        }
        return {
            currentEncorePackage: encorePackage && !isEncorePackageErrorProp(encorePackage) ? encorePackage : null,
            upcomingPackages: [],
            expiredPackages: [],
        };
    }

    const sortedEncorePackages = [...encorePackage].sort(
        (a, b) => getPackageStartTime(b, Number.POSITIVE_INFINITY) - getPackageStartTime(a, Number.POSITIVE_INFINITY)
    );

    const currentEncorePackage = sortedEncorePackages.find(pkg => {
        const startDate = parseDateString(pkg.packageStartDate);
        const expiryDate = parseDateString(pkg.packageExpiryDate);

        if (!startDate || !expiryDate) {
            return false;
        }

        return isAfter(now, startDate) && isBefore(now, expiryDate);
    });

    const upcomingPackages: EncorePackageProps[] = [];
    const expiredPackages: EncorePackageProps[] = [];
    const currentExpiryDate = parseDateString(currentEncorePackage?.packageExpiryDate) || now;

    encorePackage
        .filter(pkg => pkg !== currentEncorePackage)
        .forEach(pkg => {
            const expiryDate = parseDateString(pkg.packageExpiryDate);

            // Don't show package as upcoming if it expires before current
            if (expiryDate && isAfter(expiryDate, now) && isAfter(expiryDate, currentExpiryDate)) {
                upcomingPackages.push(pkg);
            } else {
                expiredPackages.push(pkg);
            }
        });

    upcomingPackages.sort(
        (a, b) => getPackageExpiryTime(a, Number.POSITIVE_INFINITY) - getPackageExpiryTime(b, Number.POSITIVE_INFINITY)
    );

    expiredPackages.sort(
        (a, b) => getPackageExpiryTime(b, Number.NEGATIVE_INFINITY) - getPackageExpiryTime(a, Number.NEGATIVE_INFINITY)
    );

    return {
        currentEncorePackage: currentEncorePackage ?? expiredPackages[0] ?? null,
        upcomingPackages,
        expiredPackages,
    };
};

export const useEncorePackageGroups = (
    encorePackage: EncorePackageProps | EncorePackageProps[] | EncorePackageErrorProp | null | undefined
): PackageGroups => {
    return useMemo(() => getEncorePackageGroups(encorePackage), [encorePackage]);
};
