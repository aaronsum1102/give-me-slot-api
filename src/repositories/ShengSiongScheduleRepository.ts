import { ShengSiongClient, ShengSiongResponse } from '../clients/ShengSiongClient';
import Schedule from '../models/Schedule';
import Slot from '../models/Slot';
import { Vendor } from '../constants/Vendor';
import moment from 'moment-timezone';

export default class ShengSiongScheduleRepository {
  private readonly shengSiongClient = new ShengSiongClient();

  private getDateTime(date: string, time: string): string {
    const slotDate = moment
      .tz(new Date(date), 'Asia/Singapore')
      .year(moment().year())
      .format('YYYY-MM-DD');
    return moment.tz(`${slotDate} ${time}`, 'YYYY-MM-DD HH:mm', 'Asia/Singapore').format();
  }

  private processResponse(id: Vendor, result: ShengSiongResponse): Schedule {
    if (result.status) {
      if (result.data?.response === 'Success') {
        const slot = result.data.result[0];
        const index = slot.indexOf(',');
        if (index > -1) {
          const date = slot.slice(0, index);
          const deliverPeriod = slot.slice(index + 1).trim();
          const startTime = deliverPeriod.slice(0, deliverPeriod.indexOf('-'));
          const endTime = deliverPeriod.slice(deliverPeriod.indexOf('-') + 1);
          return new Schedule(id, [
            new Slot(this.getDateTime(date, startTime), this.getDateTime(date, endTime), true)
          ]);
        } else {
          return new Schedule(id, []);
        }
      } else {
        return new Schedule(id, []);
      }
    } else {
      return new Schedule(id, []);
    }
  }

  async getDeliverySchedule(postalCode: string): Promise<Schedule> {
    const ssResponse = await this.shengSiongClient.getSlot(postalCode);
    console.log('chcek', ssResponse);
    return this.processResponse(Vendor.ShengSiong, ssResponse);
  }
}
