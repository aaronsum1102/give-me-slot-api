import Slot from './Slot';

export class Schedule {
  id: string;
  slots: Slot[];

  constructor(id: string, slots: Slot[]) {
    this.id = id;
    this.slots = slots;
  }
}

export default Schedule;
