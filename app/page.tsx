import Logo from "./_components/logo";
import { Suspense } from "react";
import AccessModule from "@/app/_components/AccessModule/access-module";
import TermsAndConditionsLink from "@/app/_components/terms-and-conditions-link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between gap-10 w-full h-full">
      <Logo />

      <Suspense fallback={<div>Loading...</div>}>
        <AccessModule />
      </Suspense>

      <div className="flex items-end pb-4">
        <TermsAndConditionsLink />
      </div>
    </main>
  );
}
