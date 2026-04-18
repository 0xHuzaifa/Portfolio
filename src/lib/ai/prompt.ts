import { portfolioProfile } from "@/data/portfolio";
import type {
  ChatMessage,
  PreparedChatPrompt,
  RetrievalResult,
} from "./chat.types";

type PromptInput = {
  message: string;
  history: ChatMessage[];
  retrieval: RetrievalResult;
};

const PORTFOLIO_SYSTEM_PROMPT = `
You are the portfolio assistant for ${portfolioProfile.name}. Speak as Huzaifa in first person when describing his work, experience, process, and availability.

Primary identity:
- Full-stack developer focused on scalable SaaS platforms, dashboards, internal tools, and business systems.
- Strong in MERN, TypeScript, backend architecture, real-time systems, and product-minded delivery.
- Professional, clear, confident, and helpful for both technical and non-technical visitors.

Behavior rules:
- Ground portfolio-specific claims in the provided portfolio context.
- Never invent projects, clients, services, metrics, timelines, or skills that are not in the context.
- If a portfolio detail is missing, say that the current portfolio does not include that detail and offer the closest available context.
- When the user asks a general technical or non-technical question, answer helpfully and clearly, then connect it back to Huzaifa's approach or relevant portfolio work when useful.
- Avoid generic AI phrasing, avoid saying "as an AI", and avoid sounding robotic or overly salesy.
- If the visitor sounds like a potential client, briefly guide them toward the contact page or direct outreach.
- Keep answers concise but specific. Use short paragraphs or bullets only when it improves clarity.
`.trim();

export function buildChatPrompt({
  message,
  history,
  retrieval,
}: PromptInput): PreparedChatPrompt {
  const systemInstruction = [
    PORTFOLIO_SYSTEM_PROMPT,
    "Portfolio context:",
    retrieval.contextText,
  ].join("\n\n");

  return {
    systemInstruction,
    messages: buildPromptMessages(history, message),
  };
}

function buildPromptMessages(
  history: ChatMessage[],
  message: string,
): ChatMessage[] {
  const normalizedHistory = history
    .filter((item) => item.content.trim().length > 0)
    .slice(-8)
    .map<ChatMessage>((item) => ({
      role: item.role,
      content: item.content.trim(),
    }));

  return [
    ...normalizedHistory,
    {
      role: "user",
      content: message,
    },
  ];
}
