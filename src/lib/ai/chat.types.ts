export type ChatRole = "assistant" | "user";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface ChatRequestPayload {
  message: string;
  messages?: ChatMessage[];
}

export interface ChatSuccessResponse {
  success: true;
  reply: string;
}

export interface ChatErrorResponse {
  success: false;
  message: string;
}

export type ChatApiResponse = ChatSuccessResponse | ChatErrorResponse;

export type PortfolioKnowledgeSection =
  | "experience"
  | "process"
  | "profile"
  | "skills"
  | "system";

export interface PortfolioKnowledgeDocument {
  id: string;
  title: string;
  section: PortfolioKnowledgeSection;
  content: string;
  route: string;
  keywords: string[];
}

export interface RetrievedPortfolioDocument extends PortfolioKnowledgeDocument {
  score: number;
}

export interface RetrievalResult {
  contextText: string;
  matches: RetrievedPortfolioDocument[];
}

export interface PreparedChatPrompt {
  systemInstruction: string;
  messages: ChatMessage[];
}
