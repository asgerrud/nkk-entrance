import OpeningHoursDisclaimer from "./OpeningHoursDisclaimer/opening-hours-disclaimer";
import { TicketType } from "@/types/enums/TicketType";

interface GuestAccessUIProps {
  onRequestTicket: (ticketType: TicketType) => Promise<void>;
  loading: boolean;
}

export default function GuestAccess({
  onRequestTicket,
  loading,
}: GuestAccessUIProps) {
  return (
    <div className="space-y-8" data-testid="guest-access">
      <button
        className="btn-primary"
        onClick={() => onRequestTicket(TicketType.GUEST)}
        data-testid="get-ticket-button"
      >
        {loading ? "Loading..." : "Get entrance ticket"}
      </button>

      <div className="max-w-sm">
        <OpeningHoursDisclaimer />
      </div>
    </div>
  );
}
