import { useState } from "react";
import { displayWeekdayPeakHours } from "@/utils/DateUtil";
import { TicketType } from "@/types/enums/TicketType";

interface BuddySystemAccessProps {
  onRequestTicket: (ticketType: TicketType) => void;
}

export default function BuddySystemAccess({
  onRequestTicket,
}: BuddySystemAccessProps) {
  const [hasUserConfirmed, setUserConfirmed] = useState(false);

  return (
    <div
      className="flex flex-col h-full max-w-sm space-y-10"
      data-testid="buddy-system"
    >
      {!hasUserConfirmed ? (
        <>
          <div>
            <p className="mb-2">
              Access to NKK is limited to members only during peak hours:
            </p>
            <p className="font-bold">week days {displayWeekdayPeakHours()}</p>
          </div>

          <button
            className="btn-primary"
            onClick={() => setUserConfirmed(true)}
            data-testid="button-with-member"
          >
            I am here with a member
          </button>
        </>
      ) : (
        <>
          <p>
            Members of NKK can bring one non-member as buddy during peak hours.
            <br />
            <br />
            The member controls the door access, and you will not be able to
            open the door yourself.
          </p>
          <button
            className="btn-primary text-sm"
            onClick={() => onRequestTicket(TicketType.BUDDY)}
            data-testid="button-confirm"
          >
            I confirm that I want to buy access via the buddy system
          </button>
        </>
      )}
    </div>
  );
}
