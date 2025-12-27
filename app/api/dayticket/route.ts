import crypto from "crypto";
import { DAYTICKET_CONFIG } from "@/types/constants";
import base45 from "base45";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc)
dayjs.extend(timezone);

export function generateDayTicket() {
  const { SECRET, NONCE_SIZE, DIGEST_SIZE, USER_ID, TOKEN_TYPE, TOKEN_MEDIA } = DAYTICKET_CONFIG;

  const expiresAt = dayjs()
    .tz("Europe/Copenhagen")
    .endOf('day')
    .toDate();

  const data = Buffer.alloc(12);
  data.writeUInt32BE(USER_ID, 0);
  data.writeUInt32BE(Math.floor(expiresAt.getTime() / 1000), 4);
  data.writeUInt16BE(TOKEN_TYPE, 8);
  data.writeUInt16BE(TOKEN_MEDIA, 10);

  const nonce = crypto.randomBytes(NONCE_SIZE);

  const signature = crypto
    .createHash("shake256", { outputLength: DIGEST_SIZE })
    .update(Buffer.concat([data, nonce, SECRET]))
    .digest();

  return base45.encode(
    new Uint8Array(Buffer.concat([data, nonce, signature]))
  );
}

export async function GET() {
  const token = generateDayTicket();

  return Response.json({
    dayticket_id: 1,
    qr_code: token,
  });
}
