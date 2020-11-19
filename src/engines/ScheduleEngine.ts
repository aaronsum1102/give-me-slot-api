import ShengSiongScheduleRepository from '../repositories/ShengSiongScheduleRepository';
import NTUCScheduleRepository from '../repositories/NTUCScheduleRepository';
import GiantColdStorageRepository from '../repositories/GiantColdStorageRepository';
import Schedule from '../models/Schedule';

export default class ScheduleEngine {
  private readonly ssScheduleRepositoty = new ShengSiongScheduleRepository();
  private readonly ntucScheduleRepository = new NTUCScheduleRepository();
  private readonly gcsScheduleRepository = new GiantColdStorageRepository();

  async getNTUCSchedule(postalCode: string): Promise<Schedule> {
    return this.ntucScheduleRepository.getAvailableSlots(postalCode);
  }

  async getShengSiongSchedule(postalCode: string): Promise<Schedule> {
    return this.ssScheduleRepositoty.getDeliverySchedule(postalCode);
  }

  async getGiantSchedule(postalCode: string): Promise<Schedule> {
    return this.gcsScheduleRepository.getGiantAvailableSlots(postalCode);
  }

  async getColdStorageSchedule(postalCode: string): Promise<Schedule> {
    return this.gcsScheduleRepository.getColdStorageAvailableSlots(postalCode);
  }

  async getSchedule(postalCode: string): Promise<Schedule[]> {
    let result: Schedule[] = [];
    result = await Promise.all([
      this.getNTUCSchedule(postalCode),
      this.getShengSiongSchedule(postalCode),
      this.getGiantSchedule(postalCode),
      this.getColdStorageSchedule(postalCode)
    ]);
    return result;
  }
}
