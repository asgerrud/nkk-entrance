"use client";

import Script from "next/script";
import { useState } from "react";
import GuestAccess from "@/app/_components/guest-access";
import BuddySystemAccess from "@/app/_components/buddy-system-access";
import { isInsideGuestHours } from "@/utils/DateUtil";
import { CreateSession } from "@/types/interfaces/CreateSession";

export default function PaymentModule() {
  const [isLoading, setLoading] = useState(false);

  const createSession = async (isBuddyTicket: boolean) => {
    setLoading(true);

    // TODO: create session from raspberry pi to ensure connection

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
