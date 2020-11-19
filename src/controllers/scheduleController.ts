import { Request, Response, Router } from 'express';
import ScheduleEngine from '../engines/ScheduleEngine';

export const schedulesRouter = Router();
const scheduleEngine = new ScheduleEngine();

schedulesRouter.get('/:postalCode', async (req: Request, res: Response) => {
  try {
    const result = await scheduleEngine.getSchedule(req.params.postalCode);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

schedulesRouter.get('/ntuc/:postalCode', async (req: Request, res: Response) => {
  try {
    const result = await scheduleEngine.getNTUCSchedule(req.params.postalCode);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

schedulesRouter.get('/shengsiong/:postalCode', async (req: Request, res: Response) => {
  try {
    const result = await scheduleEngine.getShengSiongSchedule(req.params.postalCode);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

schedulesRouter.get('/giant/:postalCode', async (req: Request, res: Response) => {
  try {
    const result = await scheduleEngine.getGiantSchedule(req.params.postalCode);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

schedulesRouter.get('/coldstorage/:postalCode', async (req: Request, res: Response) => {
  try {
    const result = await scheduleEngine.getColdStorageSchedule(req.params.postalCode);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
