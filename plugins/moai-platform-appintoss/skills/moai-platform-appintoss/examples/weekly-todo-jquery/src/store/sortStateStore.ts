export class SortStateStore {
  private isSorting: boolean;

  constructor(initialState: boolean = false) {
    this.isSorting = initialState;
    this.notify();
  }

  public getIsSorting(): boolean {
    return this.isSorting;
  }

  public setIsSorting(newState: boolean) {
    if (this.isSorting !== newState) {
      this.isSorting = newState;
      this.notify();
    }
  }

  private notify() {
    $(document).trigger('sortingUpdated', [this.isSorting]);
  }
}
