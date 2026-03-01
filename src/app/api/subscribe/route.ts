import { NextRequest, NextResponse } from "next/server";

const LIST_NAME = "cookingtemps";

// Cache the list ID in-memory after first lookup (resets on server restart)
let cachedListId: number | null = null;

async function getListId(apiKey: string): Promise<number | null> {
    if (cachedListId) return cachedListId;

    const res = await fetch("https://api.brevo.com/v3/contacts/lists?limit=50&offset=0", {
        headers: { "accept": "application/json", "api-key": apiKey },
    });
    if (!res.ok) return null;

    const data = await res.json();
    const match = (data.lists as { id: number; name: string }[])?.find(
        (l) => l.name.toLowerCase() === LIST_NAME.toLowerCase()
    );
    if (match) cachedListId = match.id;
    return cachedListId;
}

export async function POST(req: NextRequest) {
    try {
        const { email, firstName, lastName } = await req.json();

        if (!email || typeof email !== "string") {
            return NextResponse.json({ error: "Email is required." }, { status: 400 });
        }

        const apiKey = process.env.BREVO_API_KEY;
        if (!apiKey) {
            console.error("BREVO_API_KEY is not set.");
            return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
        }

        // Resolve the list ID by name
        const listId = await getListId(apiKey);

        const payload: Record<string, unknown> = {
            email: email.trim().toLowerCase(),
            updateEnabled: true,
        };

        const attrs: Record<string, string> = {};
        if (firstName?.trim()) attrs["FIRSTNAME"] = firstName.trim();
        if (lastName?.trim()) attrs["LASTNAME"] = lastName.trim();
        if (Object.keys(attrs).length > 0) payload.attributes = attrs;

        if (listId) payload.listIds = [listId];
        else console.warn(`Brevo list "${LIST_NAME}" not found — contact saved without a list.`);

        const res = await fetch("https://api.brevo.com/v3/contacts", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "api-key": apiKey,
            },
            body: JSON.stringify(payload),
        });

        // 201 = created, 204 = updated (updateEnabled)
        if (res.status === 201 || res.status === 204) {
            return NextResponse.json({ success: true }, { status: 200 });
        }

        const data = await res.json().catch(() => ({}));
        console.error("Brevo error:", res.status, data);
        return NextResponse.json(
            { error: data?.message ?? "Failed to subscribe. Please try again." },
            { status: res.status }
        );
    } catch (err) {
        console.error("Subscribe route error:", err);
        return NextResponse.json({ error: "Unexpected error. Please try again." }, { status: 500 });
    }
}
