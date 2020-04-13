import ShengSiongScheduleRepository from "../repositories/ShengSiongScheduleRepository";
import NTUCScheduleRepository from "../repositories/NTUCScheduleRepository";
import Schedule from "../models/Schedule";

export default class ScheduleEngine {
  private readonly ssScheduleRepositoty = new ShengSiongScheduleRepository();
  private readonly ntucScheduleRepository = new NTUCScheduleRepository();
  async getSchedule(postalCode: string): Promise<Schedule[]> {
    let result: Schedule[] = [];
    result = await Promise.all([
      //this.ssScheduleRepositoty.getDeliverySchedule(postalCode),
      this.ntucScheduleRepository.getAvailableSlots(postalCode),
    ]);
    return result;
  }
}
