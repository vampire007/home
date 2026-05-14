
import express, { type Request, type Response } from 'express';
import { getHistory, deleteHistoryItem } from '../services/historyService.js';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const history = await getHistory();
    res.json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to get history' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteHistoryItem(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete history item' });
  }
});

export default router;
