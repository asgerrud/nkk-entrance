import { CreateSession } from "@/types/interfaces/CreateSession";
import { TicketType } from "@/types/enums/TicketType";

export async function POST(req: Request) {
  const body: CreateSession = await req.json();

  const ticketType = body.isBuddyTicket ? TicketType.BUDDY : TicketType.GUEST;

  const options = {
    method: "POST",
    url: "https://checkout-api.reepay.com/v1/session/charge",
    headers: {
      authorization: `Basic ${process.env.FRISBII_PRIVATE_KEY}`,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      locale: "en_GB",
      order: {
        handle: `${ticketType}-${Date.now()}`,
        amount: 5000,
        currency: "DKK",
        customer: {
          handle: "c-0000",
          first_name: "Guest",
          last_name: "Climber",
        },
      },
      ttl: "PT6H",
      settle: true,
      accept_url: `${process.env.BASE_URL}ticket`,
    }),
  };

  const response = await fetch(options.url, options);

  const data = await response.json();

  return Response.json(data);
}
