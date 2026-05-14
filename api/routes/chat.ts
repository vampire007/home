
import express, { type Request, type Response } from 'express';
import { chatWithModel } from '../services/modelService.js';
import { saveHistoryItem } from '../services/historyService.js';
import type { ChatRequest, ChatResponse, HistoryItem } from '../../shared/types.js';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { prompt, platforms } = req.body as ChatRequest;

    if (!prompt || !platforms || platforms.length === 0) {
      res.status(400).json({ success: false, error: 'Prompt and platforms are required' });
      return;
    }

    // 并行调用所有模型
    const promises = platforms.map(platform => chatWithModel(prompt, platform));
    const responses = await Promise.all(promises);

    // 保存到历史记录
    const historyItem: HistoryItem = {
      id: Date.now().toString(),
      prompt,
      responses,
      timestamp: Date.now(),
    };
    await saveHistoryItem(historyItem);

    res.json({ success: true, data: responses, historyId: historyItem.id });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ success: false, error: 'Failed to process chat' });
  }
});

export default router;
