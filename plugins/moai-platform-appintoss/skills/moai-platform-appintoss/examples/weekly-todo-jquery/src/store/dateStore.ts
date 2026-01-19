import { format } from 'date-fns';

export class DateStore {
  private currentDate: string;

  constructor(initialDate: number = Date.now()) {
    this.currentDate = format(initialDate, 'yyyy-MM-dd');
    this.notify();
  }

  public getCurrentDate(): string {
    return this.currentDate;
  }

  public setCurrentDate(newDate: string) {
    if (this.currentDate !== newDate) {
      this.currentDate = newDate;
      this.notify();
    }
  }

  private notify() {
    $(document).trigger('dateUpdated', [this.currentDate]);
  }
}
