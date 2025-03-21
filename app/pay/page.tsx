"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [hasLoadedScript, setHasLoadedScript] = useState<boolean>(false);

  useEffect(() => {
    const creatSession = async () => {
      const res = await fetch("./api/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { id } = await res.json();

      setHasLoadedScript(false);
      setSessionId(id);
    };

    if (hasLoadedScript) {
      creatSession();
    }
  }, [hasLoadedScript]);

  useEffect(() => {
    if (sessionId) {
      new window.Reepay.WindowCheckout(sessionId);
    }
  }, [sessionId]);

  return (
    <>
      <div className="flex flex-col w-full h-full max-w-[640px] mx-auto justify-center items-center">
        {!sessionId && <div>Loading...</div>}
      </div>
      <Script
        src="https://checkout.reepay.com/checkout.js"
        onLoad={() => {
          setHasLoadedScript(true);
        }}
      />
    </>
  );
}
