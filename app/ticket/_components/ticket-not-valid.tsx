"use client";

import { clearSavedTicket } from "@/utils/ticketStorage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface TicketNotValidProps {
  invoice: string;
}

export default function TicketNotValid({ invoice }: TicketNotValidProps) {
  const router = useRouter();

  useEffect(() => {
    clearSavedTicket();
  }, []);

  const goToHomeScreen = () => {
    router.push("/");
  };

  return (
    <>
      <div
        className="flex flex-col items-center p-5 my-5 font-medium max-w-lg rounded-md bg-red-200"
        data-testid="ticket-not-valid-message"
      >
        <p className="mt-2">
          The ticket is no longer valid. Please purchase a new one
        </p>
      </div>
      <small className="font-mono text-gray-600" data-testid="ticket-id">
        Ticket id: {invoice}
      </small>

      <div className="mt-8">
        <button className="btn-primary" onClick={goToHomeScreen}>
          Buy another ticket
        </button>
      </div>
    </>
  );
}
