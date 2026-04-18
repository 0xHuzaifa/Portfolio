import { NextResponse } from "next/server";
import {
  getChatReply,
  isChatServiceError,
  validateChatRequest,
} from "@/lib/ai/chat";
import type { ChatApiResponse } from "@/lib/ai/chat.types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json<ChatApiResponse>(
      {
        success: false,
        message: "Unable to read the submitted chat message.",
      },
      { status: 400 },
    );
  }

  const validation = validateChatRequest(payload);

  if (!validation.success) {
    return NextResponse.json<ChatApiResponse>(
      {
        success: false,
        message: validation.message,
      },
      { status: 400 },
    );
  }

  try {
    const reply = await getChatReply(validation.data);

    return NextResponse.json<ChatApiResponse>({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Chat request failed", error);

    if (isChatServiceError(error)) {
      return NextResponse.json<ChatApiResponse>(
        {
          success: false,
          message: error.message,
        },
        { status: error.status },
      );
    }

    return NextResponse.json<ChatApiResponse>(
      {
        success: false,
        message:
          "The assistant could not respond right now. Please try again in a moment.",
      },
      { status: 500 },
    );
  }
}
