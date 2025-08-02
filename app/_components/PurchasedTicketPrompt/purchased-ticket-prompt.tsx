interface PurchasedTicketPromptProps {
  onViewTicket: () => void;
  onDismiss: () => void;
}

export default function PurchasedTicketPrompt({
  onViewTicket,
  onDismiss,
}: PurchasedTicketPromptProps) {
  return (
    <div className="flex flex-col gap-4 text-center h-full">
      <p className="mb-4">You have already purchased a ticket for today</p>
      <button className="btn-primary" onClick={onViewTicket}>
        View ticket
      </button>
      <button className="btn-secondary" onClick={onDismiss}>
        Buy another ticket
      </button>
    </div>
  );
}
