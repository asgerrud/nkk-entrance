interface TicketConfirmationReceiptProps {
  invoice: string;
}

export default function TicketConfirmationReceipt({
  invoice,
}: TicketConfirmationReceiptProps) {
  return (
    <>
      <div
        className="my-10 font-medium max-w-lg rounded-md bg-gray-100 p-5"
        data-testid="day-ticket-receipt"
      >
        Show this confirmation to your friend / NKK member to get access to the
        climbing area
      </div>
      <small className="font-mono text-gray-600" data-testid="ticket-id">
        Ticket id: {invoice}
      </small>
    </>
  );
}
