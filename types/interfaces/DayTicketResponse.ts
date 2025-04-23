export interface DayTicketResponse {
  dayticket_id: number;
  qr_code: string;
  detail?: {
    reason: string;
  };
}
