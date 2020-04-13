import express, { Request, Response, Router } from "express";
import ScheduleEngine from "../engines/ScheduleEngine";

export const schedulesRouter = express.Router();
const scheduleEngine = new ScheduleEngine();

schedulesRouter.get("/:postalCode", async (req: Request, res: Response) => {
  try {
    const result = await scheduleEngine.getSchedule(req.params.postalCode);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

schedulesRouter.get(
  "/ntuc/:postalCode",
  async (req: Request, res: Response) => {
    try {
      const result = await scheduleEngine.getNTUCSchedule(
        req.params.postalCode
      );
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

schedulesRouter.get(
  "/shengsiong/:postalCode",
  async (req: Request, res: Response) => {
    try {
      const result = await scheduleEngine.getShengSiongSchedule(
        req.params.postalCode
      );
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);
