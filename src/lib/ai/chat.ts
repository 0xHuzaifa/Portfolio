import "server-only";
import type { ChatMessage, ChatRequestPayload } from "./chat.types";
import { generateChatCompletion, isAIProviderError } from "./models";
import { buildChatPrompt } from "./prompt";
import { retrievePortfolioContext } from "./retrieval";

const MAX_HISTORY_MESSAGES = 8;
const MAX_MESSAGE_LENGTH = 2000;

export class ChatServiceError extends Error {
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.name = "ChatServiceError";
    this.status = status;
  }
}

export function isChatServiceError(error: unknown): error is ChatServiceError {
  return error instanceof ChatServiceError;
}

export function validateChatRequest(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return {
      success: false as const,
      message: "A chat message is required.",
    };
  }

  const { message, messages } = payload as ChatRequestPayload;

  if (typeof message !== "string") {
    return {
      success: false as const,
      message: "The message must be a string.",
    };
  }

  const trimmedMessage = message.trim();

  if (!trimmedMessage) {
    return {
      success: false as const,
      message: "Please enter a message before sending.",
    };
  }

  if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
    return {
      success: false as const,
      message: "Please keep your message under 2000 characters.",
    };
  }

  if (messages !== undefined && !Array.isArray(messages)) {
    return {
      success: false as const,
      message: "Conversation history must be an array of messages.",
    };
  }

  const historyValidation = normalizeHistory(messages ?? []);

  if (!historyValidation.success) {
    return historyValidation;
  }

  return {
    success: true as const,
    data: {
      message: trimmedMessage,
      messages: historyValidation.data,
    },
  };
}

export async function getChatReply(input: {
  message: string;
  messages: ChatMessage[];
}) {
  const retrieval = retrievePortfolioContext(input.message);
  const prompt = buildChatPrompt({
    message: input.message,
    history: input.messages,
    retrieval,
  });

  try {
    return await generateChatCompletion(prompt);
  } catch (error) {
    if (isAIProviderError(error)) {
      throw new ChatServiceError(error.message, error.status);
    }

    throw new ChatServiceError(
      "The assistant could not generate a response right now. Please try again.",
      500,
    );
  }
}

function normalizeHistory(messages: unknown[]) {
  const normalizedMessages: ChatMessage[] = [];

  for (const item of messages.slice(-MAX_HISTORY_MESSAGES)) {
    if (!item || typeof item !== "object") {
      return {
        success: false as const,
        message: "Each history item must be a valid message object.",
      };
    }

    const { role, content } = item as ChatMessage;

    if (role !== "assistant" && role !== "user") {
      return {
        success: false as const,
        message: "History messages must use either the user or assistant role.",
      };
    }

    if (typeof content !== "string") {
      return {
        success: false as const,
        message: "History messages must contain text content.",
      };
    }

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      continue;
    }

    normalizedMessages.push({
      role,
      content: trimmedContent.slice(0, MAX_MESSAGE_LENGTH),
    });
  }

  return {
    success: true as const,
    data: normalizedMessages,
  };
}
