export async function GET() {
  const response = await fetch("https://lockoff-api.gnerd.dk/healtz", {
    method: "GET",
    signal: AbortSignal.timeout(5000),
    headers: {
      accept: "application/json",
    },
  });

  const data = await response.json();

  return Response.json(data);
}
