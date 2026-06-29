import { Interval, JSDayNumber, KeazDayNumber, Minutes } from "../types/dateTime";
import { padStart } from "lodash";
import {
    fromUnixTime,
    addDays,
    isSameDay,
    isWeekend,
    isBefore,
    isAfter,
    isValid,
    format,
    parse,
    parseISO,
} from "date-fns";

export const daysInWeek = 7;
export const daysInMonth = 30;
export const hoursInDay = 24;
export const hoursInHalfDay = hoursInDay / 2;
export const milliSecondsInSecond = 1000;
export const secondsInMinute = 60;
export const minutesInHour = 60;
export const monthsIn5Years = 60;
export const minutesInHalfHour = minutesInHour / 2;
export const secondsInHour = secondsInMinute * minutesInHour;
const jsDayToKeazDayIncrement = 6;

export const timeString24ToMinutes = (time: string): Minutes | undefined => {
    const split = time.split(":");
    if (split.length !== 2) {
        return;
    }

    const hours = parseInt(split[0]);
    const minutes = parseInt(split[1]);
    if (isNaN(hours) || isNaN(minutes)) {
        return;
    }

    return (hours % hoursInDay) * minutesInHour + (minutes % minutesInHour);
};

export const intervalToTimes = (interval: Interval, gap: Minutes = minutesInHalfHour): Minutes[] => {
    const result = [interval.start];
    const first = Math.floor(interval.start / gap + 1) * gap;

    for (let t = first; t < interval.end; t += gap) {
        result.push(t);
    }

    if (interval.start < interval.end) {
        result.push(interval.end);
    }

    return result;
};

export const timeTo12HourString = (time: Minutes, spaceBetweenAmPm = true): string => {
    const time24 = time % (hoursInDay * minutesInHour);
    const time12 = time24 % (hoursInHalfDay * minutesInHour);
    const amPmString = time12 === time24 ? "am" : "pm";
    const hours = Math.floor(time12 / minutesInHour);
    const hoursStr = padStart(hours === 0 ? "12" : hours.toString(), 2, "0");
    const minutes = time12 - hours * minutesInHour;
    const minutesStr = padStart(minutes.toString(), 2, "0");
    return `${hoursStr}:${minutesStr}${spaceBetweenAmPm ? " " : ""}${amPmString}`;
};

export const jSDayNumberToKeazDayNumber = (js: JSDayNumber): KeazDayNumber =>
    (js + jsDayToKeazDayIncrement) % daysInWeek;

export const dateWithTime = (date: Date, time: Minutes): Date => {
    const result = new Date(date);
    const hours = Math.floor(time / minutesInHour);
    const minutes = time - hours * minutesInHour;
    result.setHours(hours % hoursInDay, minutes % minutesInHour);
    return result;
};

// Converts a Date object to a string in the format of yyyy-mm-dd
export const dateToYYYYMMDD = (date: Date): string => {
    return format(date, "yyyy-MM-dd");
};

// Converts a Date object to a string in the format of HH:MM, MM means minutes here
export const dateToHHMM = (date: Date): string => {
    return format(date, "HH:mm");
};

export const epochAndOffsetToDate = (epoch: number, offset: number): Date => {
    const t = epochToLocalDate(epoch);
    t.setTime(
        t.getTime() + t.getTimezoneOffset() * secondsInMinute * milliSecondsInSecond - offset * milliSecondsInSecond
    );
    return t;
};

export const dateWithOffset = (epoch: number, offset: number): Date => epochAndOffsetToDate(epoch, offset);

export const epochToLocalDate = (epoch: number): Date => fromUnixTime(epoch);

export const getDate = (day: number, month: number, year: number): Date | undefined => {
    const date = new Date(year, month - 1, day);
    if (isValid(date)) {
        return date;
    }
    return;
};

export const isFutureDate = (expiry?: Date): boolean => {
    if (expiry === undefined) {
        return false;
    }

    return isValid(expiry) && isAfter(expiry, new Date());
};

export const isTimeWithinInterval = (time?: number, interval?: Interval): boolean =>
    time !== undefined && interval !== undefined && time >= interval.start && time <= interval.end;

export const differenceInBusinessDays = (start: Date, end: Date): number => {
    let nBusinessDays = 0;

    if (isSameDay(start, end)) {
        return nBusinessDays;
    }

    let current = new Date(start);
    while (current < end) {
        if (!isWeekend(current)) {
            nBusinessDays++;
        }
        current = addDays(current, 1);
    }

    return nBusinessDays;
};

interface DateTime {
    start?: Date;
    end?: Date;
}

export const isDateTimeOutsideOriginalDateTime = (param: DateTime, original: DateTime): boolean =>
    isBefore(param.end || new Date(0), original.start || new Date(0)) ||
    isAfter(param.start || new Date(0), original.end || new Date(0));

export const numDaysAgoToUnix = (numDays: number): number => {
    const d = new Date();
    d.setDate(d.getDate() - numDays);
    return Math.floor(d.getTime() / milliSecondsInSecond);
};

export const parseFlexiBookingTime = (dateTime: string): Date => parse(dateTime, "dd/MM/yyyy hh:mm a", new Date());

export const parseDateString = (value?: string): Date | undefined => {
    if (!value || typeof value !== "string") {
        return undefined;
    }

    // Try ISO date first
    const isoDate = parseISO(value);

    if (isValid(isoDate)) {
        return isoDate;
    }

    // Try dd-MM-yyyy HH:mm:ss format
    const [datePart, timePart] = value.split(" ");
    const [day, month, year] = datePart.split("-");
    const isoString = `${year}-${month}-${day}T${timePart}Z`;
    const formattedDateTime = parseISO(isoString);

    if (isValid(formattedDateTime)) {
        return formattedDateTime;
    }

    // Try dd/MM/yyyy format
    const formattedDate = parse(value, "dd/MM/yyyy", new Date());

    if (isValid(formattedDate)) {
        return formattedDate;
    }

    return undefined;
};
