import NTUCClient from '../clients/NTUCClient';
import Schedule from '../models/Schedule';
import Slot from '../models/Slot';
import { Vendor } from '../constants/Vendor';

export default class NTUCScheduleRepository {
  private readonly client = new NTUCClient();

  async getAvailableSlots(postalCode: string): Promise<Schedule> {
    try {
      const storeId = await this.client.getDeliveryStoreId(postalCode);
      const response = await this.client.getSlots(postalCode, storeId);
      if (response?.data) {
        const slot = response.data.data.slot;
        let slots: Slot[] = [];
        Object.keys(slot).forEach((date) => {
          const slotsInDay = slot[`${date}`].map(
            (slot) => new Slot(slot.startTime, slot.endTime, slot.available)
          );
          slots = slots.concat(slotsInDay);
        });
        return new Schedule(Vendor.NTUC, slots);
      } else if (response?.error) {
        throw Error(response.error);
      }
    } catch (err) {
      console.error('Failed to get slot from NTUC', err);
      throw new Error(err);
    }
  }
}
