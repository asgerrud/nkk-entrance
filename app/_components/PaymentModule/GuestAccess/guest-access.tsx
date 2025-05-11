import OpeningHoursDisclaimer from "./opening-hours-disclaimer";

interface GuestAccessUIProps {
  onClick: () => Promise<void>;
  loading: boolean;
}

export default function GuestAccess({ onClick, loading }: GuestAccessUIProps) {
  return (
    <div className="space-y-8" data-testid="guest-access">
      <button
        className="btn-primary"
        onClick={onClick}
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
