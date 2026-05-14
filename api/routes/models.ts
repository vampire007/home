
import express, { type Request, type Response } from 'express';
import { getModels, toggleModelConnection } from '../services/modelService.js';
import type { ModelPlatform } from '../../shared/types.js';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const models = await getModels();
    res.json({ success: true, data: models });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to get models' });
  }
});

router.post('/:platform/toggle', async (req: Request, res: Response) => {
  try {
    const platform = req.params.platform as ModelPlatform;
    const model = await toggleModelConnection(platform);
    res.json({ success: true, data: model });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to toggle model connection' });
  }
});

export default router;
