import { DayTicketResponse } from "@/types/DayTicketResponse";
import QRCode from "react-qr-code";
import { redirect } from "next/navigation";

export default async function TicketPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id, invoice } = await searchParams;

  if (!id || !invoice) {
    redirect(process.env.URL!);
  }

  // TODO: Ensure purchased ticket only lasts day of purchase

  const res = await fetch(process.env.URL + "api/dayticket", {
    method: "GET",
  });

  const qrCode: DayTicketResponse = await res.json();

  if (qrCode?.detail) {
    return <div>Loading failed: {qrCode.detail.reason}</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center h-full text-xl text-center">
      <p>Here is your day ticket</p>
      <QRCode className="my-10" size={256} value={qrCode.qr_code} />
      <div>
        <p className="font-medium max-w-[300px]">
          Scan this QR code at the scanner to get access to the gym
        </p>
        <small className="mt-2 text-gray-600">
          Expires: {new Date().toLocaleDateString()}
        </small>
      </div>
    </div>
  );
}
