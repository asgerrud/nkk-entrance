"use client";

import Script from "next/script";
import { useState } from "react";
import GuestAccess from "@/app/_components/guest-access";
import BuddySystemAccess from "@/app/_components/buddy-system-access";
import { isInsideGuestHours } from "@/utils/DateUtil";
import { CreateSession } from "@/types/interfaces/CreateSession";

export default function PaymentModule() {
  const [isLoading, setLoading] = useState(false);

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

  const createSession = async (isBuddyTicket: boolean) => {
    setLoading(true);

    if (await checkSystemStatus()) {
      const payload: CreateSession = {
        isBuddyTicket: isBuddyTicket,
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

      // Open Checkout Window
      new window.Reepay.WindowCheckout(id);
    }

    setLoading(false);
  };

  return (
    <>
      <div className="text-center">
        {isInsideGuestHours() ? (
          <GuestAccess
            onClick={() => createSession(false)}
            loading={isLoading}
          />
        ) : (
          <BuddySystemAccess onConfirm={() => createSession(true)} />
        )}
      </div>

      <Script
        src="https://checkout.reepay.com/checkout.js"
        strategy="beforeInteractive"
      />
    </>
  );
}
