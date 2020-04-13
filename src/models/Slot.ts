export default class Slot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;

  constructor(startTime: string, endTime: string, isAvailable: boolean) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.isAvailable = isAvailable;
  }
}
