import { Vendor } from "../enum/Vendor";
import Slot from "./Slot";

export class Schedule {
  id: Vendor;
  slots: Slot[];

  constructor(id: Vendor, slots: Slot[]) {
    this.id = id;
    this.slots = slots;
  }
}

export default Schedule;
