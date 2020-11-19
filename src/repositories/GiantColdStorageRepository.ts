import GiantColdStorageClient from '../clients/GiantColdStorageClient';
import Schedule from '../models/Schedule';
import Slot from '../models/Slot';
import { Vendor } from '../enum/Vendor';
import moment from 'moment-timezone';

export default class GiantColdStorageRepository {
  private readonly client = new GiantColdStorageClient();

  private convertTimeTo24Hr(timeLabel: string): number {
    const timeRegex = /(\d)*/g;
    const ampmRegex = /[A-z]*$/g;
    let hours = parseInt(timeLabel.match(timeRegex)[0]);
    const ampm = timeLabel.match(ampmRegex)[0];
    if (ampm.toLowerCase() == 'pm' && hours < 12) {
      hours = hours + 12;
    }
    if (ampm.toLowerCase() == 'pm' && hours == 12) {
      hours = hours - 12;
    }
    return hours;
  }

  private getDateTime(date: string, timeLabel: string): string {
    return moment.tz(date, 'Asia/Singapore').hour(this.convertTimeTo24Hr(timeLabel)).format();
  }

  private processSlot(date: string, slot: any): Slot {
    const label = slot.label;
    const isAvailable = slot.available;
    const timeRegex = /(\d.[A-z]*)/g;
    const startHour = label.match(timeRegex)[0].trim();
    const endHour = label.match(timeRegex)[1];
    const startDateTime = this.getDateTime(date, startHour);
    const endDateTime = this.getDateTime(date, endHour);
    const result = new Slot(startDateTime, endDateTime, isAvailable);
    return result;
  }

  private sortSlots(slots: Slot[]): Slot[] {
    return slots.sort((as, bs) => {
      const asMoment = moment(as.startTime);
      const bsMoment = moment(bs.startTime);
      if (asMoment.isBefore(bsMoment)) {
        return -1;
      }
      if (asMoment.isAfter(bsMoment)) {
        return 1;
      }
      return 0;
    });
  }

  private async getSlots(postalCode: string, vendor: Vendor): Promise<Schedule> {
    try {
      const result = await this.client.getSlot(postalCode, vendor);
      if (result?.data) {
        const slot = result.data.timeslot;
        let slots: Slot[] = [];
        Object.keys(slot).forEach((date) => {
          const slotsInDay = Object.values(slot[`${date}`]).map((slot) =>
            this.processSlot(date, slot)
          );
          slots = slots.concat(slotsInDay);
        });
        return new Schedule(vendor, this.sortSlots(slots));
      }
    } catch (err) {
      console.error('getGiantAvailableSlots', err);
      throw new Error(err);
    }
  }

  async getGiantAvailableSlots(postalCode: string): Promise<Schedule> {
    return await this.getSlots(postalCode, Vendor.Giant);
  }

  async getColdStorageAvailableSlots(postalCode: string): Promise<Schedule> {
    return await this.getSlots(postalCode, Vendor.ColdStorage);
  }
}
