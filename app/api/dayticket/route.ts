export async function GET() {
  const options = {
    method: "GET",
    url: "https://lockoff-api.gnerd.dk/single-dayticket",
    headers: {
      accept: "application/json",
      ext_dayticket_token: process.env.EXT_DAYTICKET_TOKEN,
    },
  };

  const response = await fetch(options.url, options);

  const data = await response.json();

  return Response.json(data);
}
