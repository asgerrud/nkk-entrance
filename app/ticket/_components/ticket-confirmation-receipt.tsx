import { TicketCheck } from "lucide-react";

interface TicketConfirmationReceiptProps {
  invoice: string;
}

export default function TicketConfirmationReceipt({
  invoice,
}: TicketConfirmationReceiptProps) {
  return (
    <>
      <div
        className="flex flex-col items-center p-5 my-10 font-medium max-w-lg rounded-md bg-green-200"
        data-testid="day-ticket-receipt"
      >
        <TicketCheck size={32} />
        <p className="mt-2">
          Show this confirmation to your friend / NKK member to get access to
          the climbing area
        </p>
      </div>
      <small className="font-mono text-gray-600" data-testid="ticket-id">
        Ticket id: {invoice}
      </small>
    </>
  );
}
