import express, { Request, Response, Router } from "express";
import ScheduleEngine from "../engines/ScheduleEngine";

export const schedulesRouter = express.Router();
const schduleRepository = new ScheduleEngine();

schedulesRouter.get("/:postalCode", async (req: Request, res: Response) => {
  try {
    const result = await schduleRepository.getSchedule(req.params.postalCode);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
