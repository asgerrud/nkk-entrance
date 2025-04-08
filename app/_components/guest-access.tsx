import { displayGuestClosingTime } from "@/utils/DateUtil";

interface GuestAccessUIProps {
  onClick: () => Promise<void>;
  loading: boolean;
}

export default function GuestAccess({ onClick, loading }: GuestAccessUIProps) {
  return (
    <div className="space-y-8">
      <button className="btn-primary" onClick={onClick}>
        {loading ? "Loading..." : "Get entrance ticket"}
      </button>

      <div>NKK is open for guests until {displayGuestClosingTime()} today</div>
    </div>
  );
}
