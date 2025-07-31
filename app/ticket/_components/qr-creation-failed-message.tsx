interface QRCreationFailedMessageProps {
  invoice: string;
}

export default function QRCreationFailedMessage({
  invoice,
}: QRCreationFailedMessageProps) {
  return (
    <div className="font-mono">
      Failed to create QR code. The entrance system may be down. Please contact{" "}
      <b>{process.env.NEXT_PUBLIC_CONTACT_MAIL}</b> for help.
      <br />
      Please inform us about your ticket id:{" "}
      <b className="text-black font-black">{invoice}</b>
    </div>
  );
}
