import {
  ShengSiongClient,
  ShengSiongResponse,
} from "../clients/ShengSiongClient";
import Schedule from "../models/Schedule";
import { Vendor } from "../enum/Vendor";

export default class ShengSiongScheduleRepository {
  private readonly shengSiongClient = new ShengSiongClient();

  private processResponse(id: Vendor, result: ShengSiongResponse): Schedule {
    if (result.status) {
      if (result.data?.response === "Success") {
        //TODO
        return new Schedule(id, []);
      } else {
        return new Schedule(id, []);
      }
    } else {
      return new Schedule(id, []);
    }
  }

  async getDeliverySchedule(postalCode: string): Promise<Schedule> {
    const ssResponse = await this.shengSiongClient.getSlot(postalCode);
    return this.processResponse(Vendor.ShengSiong, ssResponse);
  }
}
