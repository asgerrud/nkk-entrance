'use client';
import {
  displayGuestClosingTime,
  displayMemberClosingTime,
} from '@/utils/DateUtil';
import TicketConfirmationQR from '../ticket-confirmation-qr';
import { TicketType } from '@/types/enums/TicketType';
import TicketConfirmationReceipt from '../ticket-confirmation-receipt';
import { saveTicketToStorage } from '@/utils/ticketStorage';
import { useEffect } from 'react';

interface TicketDetailsProps {
  sessionId: string;
  qrCode: string;
  invoice: string;
}

export default function TicketDetails({
  sessionId,
  qrCode,
  invoice,
}: TicketDetailsProps) {
  useEffect(() => {
    saveTicketToStorage({
      sessionId,
      invoice,
    });
  }, []);

  const ticketType = invoice.startsWith(TicketType.GUEST)
    ? TicketType.GUEST
    : TicketType.BUDDY;

  const closingTime =
    ticketType === TicketType.GUEST
      ? displayGuestClosingTime()
      : displayMemberClosingTime();

  return (
    <>
      <p className="font-bold mb-3">Here is your day ticket for NKK</p>
      <p>Valid until {closingTime} today</p>
      {ticketType === TicketType.GUEST ? (
        <TicketConfirmationQR qrCode={qrCode} />
      ) : (
        <TicketConfirmationReceipt invoice={invoice} />
      )}
    </>
  );
}
