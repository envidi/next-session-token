export async function POST(request: Request) {
  const data = await request.json();
  const sessionToken = data?.sessionToken||'';
  if (!sessionToken) {
    return Response.json(
      { message: "Không nhận được sessionToken " },
      {
        status: 400,
      },
    );
  }
  return Response.json(
    { data },
    {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=${sessionToken}; Path=/;HttpOnly`,
      },
    },
  );
}
