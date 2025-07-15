import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = body.email;

    if (!email) {
      console.error("Error: No email provided");
      return new Response(JSON.stringify({ message: "Email is required" }), {
        status: 400,
      });
    }

    // Attempt to delete email, but ignore errors if it doesn't exist
    await prisma.newsletterEmail
      .delete({
        where: { email },
      })
      .catch(() => {
        console.warn(`Email ${email} was already removed or not found.`);
      });

    console.log(`Unsubscribed: ${email}`);
    return new Response(
      JSON.stringify({ message: "Successfully unsubscribed" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Unsubscribe API Error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
