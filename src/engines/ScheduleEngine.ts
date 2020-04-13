import ShengSiongScheduleRepository from "../repositories/ShengSiongScheduleRepository";
import NTUCScheduleRepository from "../repositories/NTUCScheduleRepository";
import Schedule from "../models/Schedule";

export default class ScheduleEngine {
  private readonly ssScheduleRepositoty = new ShengSiongScheduleRepository();
  private readonly ntucScheduleRepository = new NTUCScheduleRepository();

  async getNTUCSchedule(postalCode: string): Promise<Schedule> {
    return this.ntucScheduleRepository.getAvailableSlots(postalCode);
  }

  async getShengSiongSchedule(postalCode: string): Promise<Schedule> {
    return this.ssScheduleRepositoty.getDeliverySchedule(postalCode);
  }
  async getSchedule(postalCode: string): Promise<Schedule[]> {
    let result: Schedule[] = [];
    result = await Promise.all([
      this.getNTUCSchedule(postalCode),
      this.getShengSiongSchedule(postalCode),
    ]);
    return result;
  }
}
