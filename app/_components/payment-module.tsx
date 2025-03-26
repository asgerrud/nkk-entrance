"use client";

import Script from "next/script";
import { useState } from "react";

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
      <button
        className="rounded-md bg-black w-[300px] p-4 text-white uppercase font-bold tracking-wider cursor-pointer hover:bg-[#231f21] transition"
        onClick={() => createSession()}
      >
        {isLoading ? "Loading..." : "Get entrance ticket"}
      </button>
      <Script
        src="https://checkout.reepay.com/checkout.js"
        strategy="beforeInteractive"
      />
    </>
  );
}
