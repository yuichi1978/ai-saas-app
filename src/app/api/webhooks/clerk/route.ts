import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createUser } from "@/lib/users";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    console.error("Error: SIGNING_SECRET is not defined");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  try {
    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET);

    // Get headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error("Error: Missing required Svix headers");
      return NextResponse.json(
        { error: "Missing Svix headers" },
        { status: 400 }
      );
    }

    // Get body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    let evt: WebhookEvent;

    // Verify payload with headers
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error: Could not verify webhook:", err);
      return NextResponse.json(
        { error: "Webhook verification failed" },
        { status: 400 }
      );
    }

    // Handle user creation event
    if (evt.type === "user.created") {
      const { id, email_addresses } = evt.data;

      // Check if email exists
      if (!email_addresses || email_addresses.length === 0) {
        console.error("Error: No email address found in user data");
        return NextResponse.json(
          { error: "No email address provided" },
          { status: 400 }
        );
      }

      const email = email_addresses[0].email_address;

      try {
        console.log(`Creating user: ${id}, ${email}`);
        const user = await createUser(id, email);
        // console.log(`User created successfully: ${user.id}`);

        return NextResponse.json({ user }, { status: 201 });
      } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json(
          { error: "Failed to create user" },
          { status: 500 }
        );
      }
    }

    // Handle other webhook events if needed
    console.log(`Received webhook event: ${evt.type}`);
    return NextResponse.json(
      { message: "Webhook received" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Unexpected error in webhook handler:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}