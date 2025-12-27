export const MEMBER_OPENING_HOURS = [
  { open: "09:00", close: "21:00" }, // Sunday
  { open: "07:00", close: "23:00" }, // Monday
  { open: "07:00", close: "23:00" }, // Tuesday
  { open: "07:00", close: "23:00" }, // Wednesday
  { open: "07:00", close: "23:00" }, // Thursday
  { open: "07:00", close: "21:00" }, // Friday
  { open: "09:00", close: "21:00" }, // Saturday
];

export const GUEST_OPENING_HOURS = [
  { open: "09:00", close: "21:00" }, // Sunday
  { open: "07:00", close: "15:00" }, // Monday
  { open: "07:00", close: "15:00" }, // Tuesday
  { open: "07:00", close: "15:00" }, // Wednesday
  { open: "07:00", close: "15:00" }, // Thursday
  { open: "07:00", close: "21:00" }, // Friday
  { open: "09:00", close: "21:00" }, // Saturday
];

export const TICKET_STORAGE_KEY = "nkk_ticket";

export const DAYTICKET_CONFIG = {
  SECRET: Buffer.from(process.env.DAYTICKET_SECRET ?? ""),
  NONCE_SIZE: 4,
  DIGEST_SIZE: 10,
  USER_ID: 0,
  TOKEN_TYPE: 3, // DAY_TICKET
  TOKEN_MEDIA: 1, // PRINT
}