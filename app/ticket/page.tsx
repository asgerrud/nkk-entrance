import { redirect } from "next/navigation";
import { DayTicketResponse } from "@/types/interfaces/DayTicketResponse";
import {
  displayGuestClosingTime,
  displayMemberClosingTime,
  isTicketFromToday,
} from "@/utils/DateUtil";
import { TicketType } from "@/types/enums/TicketType";
import TicketConfirmationQR from "@/app/ticket/_components/ticket-confirmation-qr";
import TicketConfirmationReceipt from "@/app/ticket/_components/ticket-confirmation-receipt";
import TicketNotValid from "@/app/ticket/_components/ticket-not-valid";
import QRCreationFailedMessage from "@/app/ticket/_components/qr-creation-failed-message";

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

  if (!isTicketFromToday(invoice)) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full text-xl text-center">
        <TicketNotValid invoice={invoice} />
      </div>
    );
  }

  const res: Response = await fetch(process.env.BASE_URL + "api/dayticket", {
    method: "GET",
  });

  if (!res.ok) {
    return <QRCreationFailedMessage invoice={invoice} />;
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
