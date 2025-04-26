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

      <div className="max-w-sm">
        <p className="pb-8">
          NKK is open for guests until {displayGuestClosingTime()} today*
        </p>
        <OpeningHourDisclaimer />
      </div>
    </div>
  );
}

function OpeningHourDisclaimer() {
  return (
    <div className="text-xs italic space-y-2">
      <p>
        *Opening hours may differ around holidays. Please check
        Nørrebrohallen&apos;s{"  "}
        <a
          className="btn-link"
          href="https://kulturogfritidn.kk.dk/huse/noerrebrohallen"
        >
          official opening hours
        </a>
      </p>
      <p>
        **There might be events planned in the gym, please check the{" "}
        <a
          className="btn-link"
          href="https://nkk.klub-modul.dk/cms/Activity.aspx"
        >
          calendar
        </a>{" "}
        to see if the gym is open for climbing today
      </p>
    </div>
  );
}
