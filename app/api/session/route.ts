export async function POST() {
  const options = {
    method: "POST",
    url: "https://checkout-api.reepay.com/v1/session/charge",
    headers: {
      authorization: `Basic ${process.env.FRISBII_PRIVATE_KEY}`,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      order: {
        handle: `order-${Date.now()}`,
        amount: 5000,
        currency: "DKK",
        customer: {
          email: "customer@example.com",
          handle: "c-0000",
          first_name: "Guest",
          last_name: "Climber",
        },
      },
      accept_url: "https://sandbox.reepay.com/api/echo?accept=true",
      cancel_url: "https://sandbox.reepay.com/api/echo?accept=false",
    }),
  };

  const response = await fetch(options.url, options);

  const data = await response.json();

  return Response.json(data);
}
