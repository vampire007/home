
import type { ModelPlatform, ModelStatus, ChatResponse } from '../../shared/types.js';

export const MODELS: ModelStatus[] = [
  { platform: 'doubao', name: '豆包', connected: false, color: '#006EFF' },
  { platform: 'deepseek', name: 'Deepseek', connected: false, color: '#10B981' },
  { platform: 'qianwen', name: '千问', connected: false, color: '#FF6B00' },
  { platform: 'wenxin', name: '文心一言', connected: false, color: '#E11D48' },
];

export async function getModels(): Promise<ModelStatus[]> {
  return MODELS;
}

export async function toggleModelConnection(platform: ModelPlatform): Promise<ModelStatus> {
  const model = MODELS.find(m => m.platform === platform);
  if (!model) {
    throw new Error('Model not found');
  }
  model.connected = !model.connected;
  return model;
}

export async function chatWithModel(prompt: string, platform: ModelPlatform): Promise<ChatResponse> {
  const timestamp = Date.now();

  // 模拟 API 调用延迟
  const delay = 1000 + Math.random() * 2000;
  await new Promise(resolve => setTimeout(resolve, delay));

  // 模拟不同模型的回复
  const mockResponses: Record<ModelPlatform, string> = {
    doubao: `【豆包回答】\n\n你好！这是豆包对"${prompt}"的回复。\n\n作为字节跳动的AI助手，我会尽力提供准确和有用的信息。`,
    deepseek: `【Deepseek回答】\n\n关于"${prompt}"，我来为你解答：\n\nDeepseek 专注于提供深度思考和专业的回答。`,
    qianwen: `【千问回答】\n\n收到你的问题：${prompt}\n\n千问是阿里云开发的大模型，我会帮你分析这个问题。`,
    wenxin: `【文心一言回答】\n\n你问得很好！关于"${prompt}"，我的看法是：\n\n文心一言是百度的AI产品，在中文理解方面有优势。`,
  };

  return {
    platform,
    success: true,
    content: mockResponses[platform],
    timestamp,
  };
}
