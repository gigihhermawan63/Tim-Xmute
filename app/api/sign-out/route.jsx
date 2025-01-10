import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const email = cookieStore.get("email")?.value;

    if (email) {
      (await cookies()).delete("email");

      return new Response(
        JSON.stringify({ messageResponse: "Successfully signed out" }),
        {
          status: 200,
          statusText: "OK",
        }
      );
    } else {
      return new Response(
        JSON.stringify({ messageResponse: "No user is signed in" }),
        {
          status: 200,
          statusText: "OK",
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ messageResponse: "Error occurred during sign-out" }),
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }
}
