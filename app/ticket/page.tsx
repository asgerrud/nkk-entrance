import { redirect } from 'next/navigation';
import { DayTicketResponse } from '@/types/interfaces/DayTicketResponse';
import { isTicketFromToday } from '@/utils/DateUtil';
import TicketNotValid from '@/app/ticket/_components/ticket-not-valid';
import TicketQrCreationFailedMessage from '@/app/ticket/_components/ticket-qr-creation-failed-message';
import TicketDetails from './_components/TicketDetails/ticket-details';

export default async function TicketPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const { id: sessionId, invoice } = await searchParams;

  if (!sessionId || !invoice) {
    redirect(process.env.BASE_URL!);
  }

  if (!isTicketFromToday(invoice)) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full text-xl text-center">
        <TicketNotValid invoice={invoice} />
      </div>
    );
  }

  const res: Response = await fetch(process.env.BASE_URL + 'api/dayticket', {
    method: 'GET',
  });

  if (!res.ok) {
    return <TicketQrCreationFailedMessage invoice={invoice} />;
  }

  const qrCode: DayTicketResponse = await res.json();

  return (
    <div className="flex flex-col justify-center items-center w-full h-full text-xl text-center">
      <TicketDetails
        sessionId={sessionId}
        invoice={invoice}
        qrCode={qrCode?.qr_code}
      />
    </div>
  );
}
