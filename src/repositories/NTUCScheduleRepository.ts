import NTUCClient from '../clients/NTUCClient';
import Schedule from '../models/Schedule';
import Slot from '../models/Slot';
import { Vendor } from '../enum/Vendor';

export default class NTUCScheduleRepository {
  private readonly client = new NTUCClient();

  async getAvailableSlots(postalCode: string): Promise<Schedule> {
    try {
      let storeId = await this.client.getDeliveryStoreId(postalCode);
      let response = await this.client.getSlots(postalCode, storeId);
      if (response?.data) {
        let slot = response.data.data.slot;
        let slots: Slot[] = [];
        Object.keys(slot).forEach((date) => {
          let slotsInDay = slot[date].map(
            (slot) => new Slot(slot.startTime, slot.endTime, slot.available)
          );
          slots = slots.concat(slotsInDay);
        });
        return new Schedule(Vendor.NTUC, slots);
      } else if (response?.error) {
        console.error(
          'NTUCScheduleRepository_getAvailableSlots',
          response.error
        );
        throw Error(response.error);
      }
    } catch (err) {
      console.error('NTUCScheduleRepository_getAvailableSlots', err);
      throw new Error(err);
    }
  }
}
