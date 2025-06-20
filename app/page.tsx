import Logo from "./_components/logo";
import { Suspense } from "react";
import AccessModule from "@/app/_components/AccessModule/access-module";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-10 h-full max-h-screen">
      <div className="mt-[8vh]">
        <Logo />
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <AccessModule />
      </Suspense>
    </main>
  );
}
