import QRCode from "react-qr-code";

interface TicketConfirmationQRProps {
  qrCode: string;
}

export default function TicketConfirmationQR({
  qrCode,
}: TicketConfirmationQRProps) {
  return (
    <>
      <QRCode
        className="my-10"
        size={256}
        value={qrCode}
        data-testid="day-ticket-qr-code"
      />
      <p className="font-medium max-w-sm">
        Scan this QR code at the scanner to get access to the gym
      </p>
    </>
  );
}
