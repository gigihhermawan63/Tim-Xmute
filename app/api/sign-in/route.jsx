import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const cookieStore = await cookies();

    const formData = await req.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    if (email !== "admin@gmail.com" || password !== "laptop1945") {
      return new Response(
        JSON.stringify({ messageResponse: "Invalid email or password." }),
        {
          status: 200,
          statusText: "OK",
        }
      );
    }

    cookieStore.set("email", email);

    return new Response(
      JSON.stringify({ messageResponse: "Signed in successful." }),
      {
        status: 200,
        statusText: "OK",
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        messageResponse: "An error occurred, please try again later.",
      }),
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }
}
