import { redirect } from "next/navigation";
import { DayTicketResponse } from "@/types/interfaces/DayTicketResponse";
import {
  displayGuestClosingTime,
  displayMemberClosingTime,
} from "@/utils/DateUtil";
import { TicketType } from "@/types/enums/TicketType";
import TicketConfirmationQR from "@/app/ticket/_components/ticket-confirmation-qr";
import TicketConfirmationReceipt from "@/app/ticket/_components/ticket-confirmation-receipt";

export default async function TicketPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const { id, invoice } = await searchParams;

  if (!id || !invoice) {
    redirect(process.env.BASE_URL!);
  }

  const ticketType = (invoice as string).startsWith(TicketType.GUEST)
    ? TicketType.GUEST
    : TicketType.BUDDY;

  const closingTime =
    ticketType === TicketType.GUEST
      ? displayGuestClosingTime()
      : displayMemberClosingTime();

  const res: Response = await fetch(process.env.BASE_URL + "api/dayticket", {
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
    <div className="flex flex-col justify-center items-center w-full h-full text-xl text-center">
      <p className="font-bold mb-3">Here is your day ticket for NKK</p>
      <p>Valid until {closingTime} today</p>
      {ticketType === TicketType.GUEST ? (
        <TicketConfirmationQR qrCode={qrCode.qr_code} />
      ) : (
        <TicketConfirmationReceipt invoice={invoice} />
      )}
    </div>
  );
}
