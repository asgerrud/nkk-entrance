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
        handle: "order-12345",
        amount: 10000,
        currency: "DKK",
        customer: {
          email: "customer@example.com",
          handle: "c-0212",
          first_name: "John",
          last_name: "Doe",
        },
        accept_url: "localhost:3000/accept/order-12345",
        cancel_url: "localhost:3000/decline/order-12345",
      },
    }),
  };

  const response = await fetch(options.url, options);

  if (!response.ok) {
    throw new Error("Failed to create Checkout session:" + response.status);
  }

  const data = await response.json();

  return Response.json(data);
}
