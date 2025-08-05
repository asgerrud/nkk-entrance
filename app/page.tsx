"use client";
import Logo from "./_components/logo";
import { Suspense, useEffect, useState } from "react";
import AccessPrompt from "@/app/_components/AccessPrompt/access-prompt";
import { getPurchasedTicketFromStorage } from "@/utils/ticketStorage";
import TermsAndConditionsLink from "./_components/terms-and-conditions-link";
import { useRouter } from "next/navigation";
import PurchasedTicketPrompt from "./_components/PurchasedTicketPrompt/purchased-ticket-prompt";
import { isTicketFromToday } from "@/utils/DateUtil";

export default function Home() {
  const router = useRouter();
  const [isTicketReminderScreenVisible, setTicketReminderVisible] =
    useState<boolean>(false);

  const savedTicket = getPurchasedTicketFromStorage();

  useEffect(() => {
    if (savedTicket && isTicketFromToday(savedTicket.invoice)) {
      setTicketReminderVisible(true);
    }
  }, []);

  const gotoPurchasedTicket = () => {
    router.push(
      `/ticket?id=${savedTicket?.sessionId}&invoice=${savedTicket?.invoice}`,
    );
  };

  return (
    <main className="flex flex-col items-center justify-between gap-8 w-full h-full">
      <Logo />

      {isTicketReminderScreenVisible ? (
        <PurchasedTicketPrompt
          onViewTicket={gotoPurchasedTicket}
          onDismiss={() => setTicketReminderVisible(false)}
        />
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <AccessPrompt />
        </Suspense>
      )}

      <div className="flex items-end pb-4">
        <TermsAndConditionsLink />
      </div>
    </main>
  );
}
