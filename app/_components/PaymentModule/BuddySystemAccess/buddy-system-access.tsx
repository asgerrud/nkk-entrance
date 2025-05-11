import { useState } from "react";
import { displayWeekdayPeakHours } from "@/utils/DateUtil";

interface BuddySystemAccessProps {
  onConfirm: () => void;
}

export default function BuddySystemAccess({
  onConfirm,
}: BuddySystemAccessProps) {
  const [hasUserConfirmed, setUserConfirmed] = useState(false);

  return (
    <div className="space-y-5 max-w-sm">
      {!hasUserConfirmed ? (
        <>
          <p>
            Access to NKK is limited to members only during peak hours (week
            days {displayWeekdayPeakHours()})
          </p>

          <button className="btn-link" onClick={() => setUserConfirmed(true)}>
            I am here with a member
          </button>
        </>
      ) : (
        <>
          <p>
            Members of NKK can bring one non-member as buddy during peak hours.
            <br />
            The member controls the door access, and you will not be able to
            open the door yourself.
          </p>
          <button className="btn-link" onClick={() => onConfirm()}>
            I confirm that I want to buy access via the buddy system
          </button>
        </>
      )}
    </div>
  );
}
