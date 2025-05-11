import PaymentModule from "@/app/_components/PaymentModule/payment-module";
import Logo from "./_components/logo";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex flex-col gap-20 justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center gap-20 mb-40">
        <div className="text-center">
          <Logo />
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <PaymentModule />
        </Suspense>
      </div>
    </main>
  );
}
