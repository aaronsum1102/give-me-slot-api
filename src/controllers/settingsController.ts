import { Request, Response, Router } from 'express';
import settings from '../../settings.json';
export const settingsRouter = Router();

settingsRouter.get('/', (req: Request, res: Response) => {
  res.status(200).json(settings);
});
