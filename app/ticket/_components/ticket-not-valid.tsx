interface TicketNotValidProps {
  invoice: string;
}

export default function TicketNotValid({ invoice }: TicketNotValidProps) {
  return (
    <>
      <div className="flex flex-col items-center p-5 my-10 font-medium max-w-lg rounded-md bg-red-200">
        <p className="mt-2">
          The ticket is not valid for today. Please purchase a new one
        </p>
      </div>
      <small className="font-mono text-gray-600" data-testid="ticket-id">
        Ticket id: {invoice}
      </small>
    </>
  );
}
