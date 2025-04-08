import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { GUEST_OPENING_HOURS, MEMBER_OPENING_HOURS } from "@/types/constants";

dayjs.extend(utc);

export const isInsideGuestHours = () => {
  const currentTime = dayjs().utc(true);
  const { open, close } = GUEST_OPENING_HOURS[currentTime.day()];

  const openTime = dayjs(open, "HH:mm");
  const closeTime = dayjs(close, "HH:mm");

  return currentTime.isAfter(openTime) && currentTime.isBefore(closeTime);
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
