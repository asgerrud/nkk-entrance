import Image from "next/image";
import PaymentModule from "@/app/_components/payment-module";

export default function Home() {
  return (
    <main className="flex flex-col gap-20 justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center gap-20 mb-40">
        <div className="text-center">
          <Image
            className="mx-auto mb-5"
            src={`/nkk-logo.png`}
            alt="Nørrebro Klatreklub Logo"
            width="128"
            height="128"
          />
          <h3 className="text-4xl font-bold text-center">
            Nørrebro Klatreklub
          </h3>
        </div>

        <PaymentModule />
      </div>
    </main>
  );
}
