interface PurchasedTicketPromptProps {
  onViewTicket: () => void;
  onDismiss: () => void;
}

export default function PurchasedTicketPrompt({
  onViewTicket,
  onDismiss,
}: PurchasedTicketPromptProps) {
  return (
    <div
      className="flex flex-col gap-4 h-full text-center"
      data-testid="purchased-ticket-prompt"
    >
      <p className="mb-4">You have already purchased a ticket for today</p>
      <button
        className="btn-primary"
        onClick={onViewTicket}
        data-testid="view-ticket-button"
      >
        View ticket
      </button>
      <button
        className="btn-secondary"
        onClick={onDismiss}
        data-testid="buy-another-ticket-button"
      >
        Buy another ticket
      </button>
    </div>
  );
}
