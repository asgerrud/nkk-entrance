import QRCode from "react-qr-code";
import { redirect } from "next/navigation";
import { DayTicketResponse } from "@/types/interfaces/DayTicketResponse";
import {
  displayGuestClosingTime,
  displayMemberClosingTime,
} from "@/utils/DateUtil";
import { TicketType } from "@/types/enums/TicketType";

export default async function TicketPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id, invoice } = await searchParams;

  if (!id || !invoice) {
    redirect(process.env.URL!);
  }

  // TODO: add expiration screen

  const ticketType = (invoice as string).startsWith(TicketType.GUEST)
    ? TicketType.GUEST
    : TicketType.BUDDY;

  const closingTime =
    ticketType === TicketType.GUEST
      ? displayGuestClosingTime()
      : displayMemberClosingTime();

  // TODO: Ensure purchased ticket only lasts day of purchase

  const res: Response = await fetch(process.env.URL + "api/dayticket", {
    method: "GET",
  });

  if (!res.ok) {
    return (
      <div className="font-mono">
        Failed to create QR code. The entrance system may be down. Please
        contact <b>{process.env.NEXT_PUBLIC_CONTACT_MAIL}</b> for help.
        <br />
        Please inform us about your ticket id:{" "}
        <b className="text-black font-black">{invoice}</b>
      </div>
    );
  }

  const qrCode: DayTicketResponse = await res.json();

  return (
    <div className="flex flex-col justify-center items-center h-full text-xl text-center">
      <p className="font-bold mb-3">Here is your day ticket for NKK</p>
      <p>Valid until {closingTime} today</p>
      {ticketType === TicketType.GUEST ? (
        <>
          <QRCode className="my-10" size={256} value={qrCode.qr_code} />
          <p className="font-medium max-w-sm">
            Scan this QR code at the scanner to get access to the gym
          </p>
        </>
      ) : (
        <>
          <div className="my-10 font-medium max-w-lg rounded-md bg-gray-100 p-5">
            Show this confirmation to your friend / NKK member to get access to
            the climbing area
          </div>
          <small className="font-mono text-gray-600">
            Ticket id: {invoice}
          </small>
        </>
      )}
    </div>
  );
}
