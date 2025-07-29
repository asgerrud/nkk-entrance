"use client";

import Script from "next/script";
import { useState } from "react";
import { isInsideGuestHours } from "@/utils/DateUtil";
import { CreateSession } from "@/types/interfaces/CreateSession";
import { useSearchParams } from "next/navigation";
import { TicketType } from "@/types/enums/TicketType";
import GuestAccess from "@/app/_components/AccessModule/GuestAccess/guest-access";
import BuddySystemAccess from "@/app/_components/AccessModule/BuddySystemAccess/buddy-system-access";

export default function AccessModule() {
  const [isLoading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const timeParam = searchParams.get("pw_time") ?? undefined;

  const checkSystemStatus = async () => {
    const statusRes = await fetch("./api/health", {
      method: "GET",
    });

    if (!statusRes.ok) {
      alert(
        `The entrance system timed out. Please try again later. If the problem persists, please notify ${process.env.NEXT_PUBLIC_CONTACT_MAIL}`,
      );
      return false;
    }

    return true;
  };

  const createSession = async (ticketType: TicketType) => {
    setLoading(true);

    if (await checkSystemStatus()) {
      const payload: CreateSession = {
        isBuddyTicket: ticketType === TicketType.BUDDY,
      };

      const res = await fetch("./api/session", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const session = await res.json();

      const error = session?.error;

      if (error) {
        alert("Error: " + error);
        return;
      }

      const id = session?.id;

      new window.Reepay.WindowCheckout(id);
    }

    setLoading(false);
  };

  return (
    <>
      <div className="flex w-full h-full justify-center text-center">
        {isInsideGuestHours(timeParam) ? (
          <GuestAccess loading={isLoading} onRequestTicket={createSession} />
        ) : (
          <BuddySystemAccess onRequestTicket={createSession} />
        )}
      </div>

      <Script
        src="https://checkout.reepay.com/checkout.js"
        strategy="afterInteractive"
      />
    </>
  );
}
