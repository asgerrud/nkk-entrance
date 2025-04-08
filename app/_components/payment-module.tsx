"use client";

import Script from "next/script";
import { useState } from "react";
import GuestAccess from "@/app/_components/guest-access";
import BuddySystemAccess from "@/app/_components/buddy-system-access";
import { isInsideGuestHours } from "@/utils/DateUtil";

export default function PaymentModule() {
  const [isLoading, setLoading] = useState(false);

  const createSession = async () => {
    setLoading(true);

    const res = await fetch("./api/session", { method: "POST" });

    const session = await res.json();

    const id = session?.id;
    const error = session?.error;

    if (error) {
      alert("Error: " + error);
    }

    // Open Checkout Window
    new window.Reepay.WindowCheckout(id);
  };

  return (
    <>
      <div className="text-center">
        {isInsideGuestHours() ? (
          <GuestAccess onClick={() => createSession()} loading={isLoading} />
        ) : (
          <BuddySystemAccess onConfirm={() => createSession()} />
        )}
      </div>

      <Script
        src="https://checkout.reepay.com/checkout.js"
        strategy="beforeInteractive"
      />
    </>
  );
}
