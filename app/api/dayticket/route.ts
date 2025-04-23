export async function GET() {
  const response = await fetch(
    "https://lockoff-api.gnerd.dk/single-dayticket",
    {
      method: "GET",
      headers: {
        accept: "application/json",
        ext_dayticket_token: process.env.EXT_DAYTICKET_TOKEN ?? "",
      },
    },
  );

  const data = await response.json();

  return Response.json(data);
}
