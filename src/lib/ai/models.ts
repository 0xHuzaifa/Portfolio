import "server-only";
import type { PreparedChatPrompt } from "./chat.types";

export type AIProvider = "gemini" | "groq";

type ProviderConfig = {
  apiKey: string;
  id: AIProvider;
  model: string;
};

type ProviderRequestResult = {
  provider: AIProvider;
  text: string;
};

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  error?: {
    message?: string;
  };
};

type GroqResponse = {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
  error?: {
    message?: string;
  };
};

const DEFAULT_PROVIDER_ORDER: AIProvider[] = ["gemini", "groq"];
const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";
const DEFAULT_GROQ_MODEL = "llama-3.1-8b-instant";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MAX_PROVIDER_RETRIES = 1;

export class AIProviderError extends Error {
  provider: AIProvider;
  status: number;

  constructor(message: string, status: number, provider: AIProvider) {
    super(message);
    this.name = "AIProviderError";
    this.provider = provider;
    this.status = status;
  }
}

export function isAIProviderError(error: unknown): error is AIProviderError {
  return error instanceof AIProviderError;
}

export async function generateChatCompletion(prompt: PreparedChatPrompt) {
  const providers = getConfiguredProviders();

  if (providers.length === 0) {
    throw new AIProviderError(
      "The assistant is not configured yet. Add GEMINI_API_KEY or GROQ_API_KEY on the server to enable chat.",
      503,
      "gemini",
    );
  }

  const failures: AIProviderError[] = [];

  for (const provider of providers) {
    try {
      const result = await invokeProvider(provider, prompt);
      return result.text;
    } catch (error) {
      const normalizedError = normalizeProviderError(error, provider.id);
      failures.push(normalizedError);

      console.error("AI provider request failed", {
        provider: normalizedError.provider,
        status: normalizedError.status,
        message: normalizedError.message,
      });
    }
  }

  const lastFailure = failures.at(-1);

  throw (
    lastFailure ??
    new AIProviderError(
      "The assistant could not generate a response right now. Please try again.",
      503,
      providers[0].id,
    )
  );
}

function getConfiguredProviders() {
  const providerOrder = getProviderOrder();
  const configuredProviders: ProviderConfig[] = [];

  for (const provider of providerOrder) {
    if (provider === "gemini") {
      const apiKey = process.env.GEMINI_API_KEY?.trim();

      if (!apiKey) {
        continue;
      }

      configuredProviders.push({
        id: "gemini",
        apiKey,
        model: process.env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL,
      });
      continue;
    }

    const apiKey = process.env.GROQ_API_KEY?.trim();

    if (!apiKey) {
      continue;
    }

    configuredProviders.push({
      id: "groq",
      apiKey,
      model: process.env.GROQ_MODEL?.trim() || DEFAULT_GROQ_MODEL,
    });
  }

  return configuredProviders;
}

function getProviderOrder() {
  const configuredOrder = process.env.AI_PROVIDER_ORDER?.trim();

  if (!configuredOrder) {
    return DEFAULT_PROVIDER_ORDER;
  }

  const parsedProviders = configuredOrder
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(
      (value): value is AIProvider => value === "gemini" || value === "groq",
    );

  return parsedProviders.length > 0 ? parsedProviders : DEFAULT_PROVIDER_ORDER;
}

async function invokeProvider(
  provider: ProviderConfig,
  prompt: PreparedChatPrompt,
): Promise<ProviderRequestResult> {
  if (provider.id === "gemini") {
    return invokeGemini(provider, prompt);
  }

  return invokeGroq(provider, prompt);
}

async function invokeGemini(
  provider: ProviderConfig,
  prompt: PreparedChatPrompt,
): Promise<ProviderRequestResult> {
  const response = await performRequestWithRetry<GeminiResponse>({
    provider: provider.id,
    request: () =>
      fetch(`${GEMINI_API_URL}/${provider.model}:generateContent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": provider.apiKey,
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [
              {
                text: prompt.systemInstruction,
              },
            ],
          },
          contents: prompt.messages.map((message) => ({
            role: message.role === "assistant" ? "model" : "user",
            parts: [
              {
                text: message.content,
              },
            ],
          })),
          generationConfig: {
            temperature: 0.3,
          },
        }),
      }),
  });

  const text = response.candidates
    ?.flatMap((candidate) => candidate.content?.parts ?? [])
    .map((part) => part.text?.trim() ?? "")
    .filter(Boolean)
    .join("\n\n");

  if (!text) {
    throw new AIProviderError(
      "Gemini returned an empty response. Please try again.",
      502,
      provider.id,
    );
  }

  return {
    provider: provider.id,
    text,
  };
}

async function invokeGroq(
  provider: ProviderConfig,
  prompt: PreparedChatPrompt,
): Promise<ProviderRequestResult> {
  const response = await performRequestWithRetry<GroqResponse>({
    provider: provider.id,
    request: () =>
      fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${provider.apiKey}`,
        },
        body: JSON.stringify({
          model: provider.model,
          messages: [
            {
              role: "system",
              content: prompt.systemInstruction,
            },
            ...prompt.messages.map((message) => ({
              role: message.role,
              content: message.content,
            })),
          ],
          temperature: 0.3,
        }),
      }),
  });

  const text = response.choices?.[0]?.message?.content?.trim() ?? "";

  if (!text) {
    throw new AIProviderError(
      "Groq returned an empty response. Please try again.",
      502,
      provider.id,
    );
  }

  return {
    provider: provider.id,
    text,
  };
}

async function performRequestWithRetry<TResponse>({
  provider,
  request,
}: {
  provider: AIProvider;
  request: () => Promise<Response>;
}) {
  let lastError: AIProviderError | null = null;

  for (let attempt = 0; attempt <= MAX_PROVIDER_RETRIES; attempt += 1) {
    let response: Response;

    try {
      response = await request();
    } catch {
      throw new AIProviderError(
        `${formatProviderName(provider)} could not be reached right now. Please try again in a moment.`,
        502,
        provider,
      );
    }

    const payload = (await response.json().catch(() => null)) as
      | TResponse
      | ProviderErrorPayload
      | null;

    if (response.ok) {
      return payload as TResponse;
    }

    const providerMessage = getProviderPayloadMessage(payload);
    const normalizedError = new AIProviderError(
      getProviderErrorMessage(provider, response.status, providerMessage),
      mapProviderStatusToHttpStatus(response.status),
      provider,
    );

    lastError = normalizedError;

    if (
      attempt >= MAX_PROVIDER_RETRIES ||
      !shouldRetryProviderRequest(response.status, providerMessage)
    ) {
      throw normalizedError;
    }

    await delay(800 * (attempt + 1));
  }

  throw (
    lastError ??
    new AIProviderError(
      `${formatProviderName(provider)} could not respond right now. Please try again.`,
      503,
      provider,
    )
  );
}

function getProviderErrorMessage(
  provider: AIProvider,
  status: number,
  providerMessage?: string,
) {
  if (providerMessage) {
    if (
      provider === "groq" &&
      (providerMessage.toLowerCase().includes("insufficient balance") ||
        providerMessage.toLowerCase().includes("balance") ||
        providerMessage.toLowerCase().includes("credit"))
    ) {
      return "Groq has insufficient balance or credits for this project. Check the Groq billing setup or rely on Gemini only.";
    }

    return providerMessage;
  }

  if (status === 401 || status === 403) {
    return `${formatProviderName(provider)} rejected the server configuration. Check the API key and model settings.`;
  }

  if (status === 429) {
    return `${formatProviderName(provider)} rate-limited this request. Please try again in a moment.`;
  }

  if (status === 500 || status === 502 || status === 503 || status === 504) {
    return `${formatProviderName(provider)} is temporarily unavailable. Please try again in a moment.`;
  }

  return `${formatProviderName(provider)} could not generate a response right now.`;
}

function mapProviderStatusToHttpStatus(status: number) {
  if (status === 401 || status === 403) {
    return 502;
  }

  if (
    status === 429 ||
    status === 500 ||
    status === 502 ||
    status === 503 ||
    status === 504
  ) {
    return 503;
  }

  return 502;
}

function shouldRetryProviderRequest(status: number, providerMessage?: string) {
  if (status === 500 || status === 502 || status === 503 || status === 504) {
    return true;
  }

  if (status !== 429) {
    return false;
  }

  if (!providerMessage) {
    return true;
  }

  const normalizedMessage = providerMessage.toLowerCase();

  return (
    !normalizedMessage.includes("quota") &&
    !normalizedMessage.includes("billing") &&
    !normalizedMessage.includes("balance") &&
    !normalizedMessage.includes("credit")
  );
}

function normalizeProviderError(error: unknown, provider: AIProvider) {
  if (error instanceof AIProviderError) {
    return error;
  }

  if (error instanceof Error) {
    return new AIProviderError(error.message, 502, provider);
  }

  return new AIProviderError(
    `${formatProviderName(provider)} failed unexpectedly.`,
    502,
    provider,
  );
}

function formatProviderName(provider: AIProvider) {
  return provider === "gemini" ? "Gemini" : "Groq";
}

function getProviderPayloadMessage(payload: unknown) {
  if (!payload || typeof payload !== "object" || !("error" in payload)) {
    return undefined;
  }

  const { error } = payload as ProviderErrorPayload;

  if (!error || typeof error !== "object") {
    return undefined;
  }

  return typeof error.message === "string" ? error.message : undefined;
}

function delay(durationMs: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, durationMs);
  });
}

type ProviderErrorPayload = {
  error?: {
    message?: string;
  };
};
