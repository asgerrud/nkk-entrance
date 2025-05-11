import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { GUEST_OPENING_HOURS, MEMBER_OPENING_HOURS } from "@/types/constants";

dayjs.extend(utc);
dayjs.extend(customParseFormat);

export const isInsideGuestHours = (date?: string) => {
  const currentDate = dayjs(date).utc(true);
  const { open, close } = GUEST_OPENING_HOURS[currentDate.day()];

  const openTime = getTimeAndMinutes(currentDate, open);
  const closeTime = getTimeAndMinutes(currentDate, close);
  const currentTime = getTimeAndMinutes(
    currentDate,
    currentDate.format("HH:mm"),
  );

  return currentTime.isAfter(openTime) && currentTime.isBefore(closeTime);
};

const getTimeAndMinutes = (date: Dayjs, time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return date.hour(hours).minute(minutes);
};

export const displayWeekdayPeakHours = () => {
  const peakStart = GUEST_OPENING_HOURS[1].close;
  const peakEnd = MEMBER_OPENING_HOURS[1].close;

  return `${peakStart} - ${peakEnd}`;
};

export const displayGuestClosingTime = () => {
  return GUEST_OPENING_HOURS[dayjs().day()].close;
};

export const displayMemberClosingTime = () => {
  return MEMBER_OPENING_HOURS[dayjs().day()].close;
};
