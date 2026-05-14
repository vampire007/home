
export type ModelPlatform = 'doubao' | 'deepseek' | 'qianwen' | 'wenxin';

export interface ModelStatus {
  platform: ModelPlatform;
  name: string;
  connected: boolean;
  color: string;
}

export interface ChatRequest {
  prompt: string;
  platforms: ModelPlatform[];
}

export interface ChatResponse {
  platform: ModelPlatform;
  success: boolean;
  content?: string;
  error?: string;
  timestamp: number;
}

export interface HistoryItem {
  id: string;
  prompt: string;
  responses: ChatResponse[];
  timestamp: number;
}
