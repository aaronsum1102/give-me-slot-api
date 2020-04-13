import {
  ShengSiongClient,
  ShengSiongResponse,
} from "../clients/ShengSiongClient";
import Schedule from "../models/Schedule";
import Slot from "../models/Slot";
import { Vendor } from "../enum/Vendor";
import moment from "moment-timezone";

export default class ShengSiongScheduleRepository {
  private readonly shengSiongClient = new ShengSiongClient();

  private getDateTime(date: string, time: string): string {
    let slotDate = moment(new Date(date))
      .tz("Asia/Singapore")
      .year(moment().year())
      .format("YYYY-MM-DD");
    return moment(`${slotDate} ${time}`, "YYYY-MM-DD HH:mm")
      .tz("Asia/Singapore")
      .format();
  }

  private processResponse(id: Vendor, result: ShengSiongResponse): Schedule {
    if (result.status) {
      if (result.data?.response === "Success") {
        let slot = result.data.result[0];
        let index = slot.indexOf(",");
        if (index > -1) {
          let date = slot.slice(0, index);
          let deliverPeriod = slot.slice(index + 1).trim();
          let startTime = deliverPeriod.slice(0, deliverPeriod.indexOf("-"));
          let endTime = deliverPeriod.slice(deliverPeriod.indexOf("-") + 1);
          return new Schedule(id, [
            new Slot(
              this.getDateTime(date, startTime),
              this.getDateTime(date, endTime),
              true
            ),
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
    return this.processResponse(Vendor.ShengSiong, ssResponse);
  }
}
