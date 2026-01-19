import { startOfWeek } from 'date-fns';
import { Storage } from '@apps-in-toss/web-framework';

export interface TaskItemType {
  id: string;
  text: string;
  isDone: boolean;
  isLike: boolean;
  date: number;
}

interface TaskStoreOptions {
  storageKey: string;
  getCurrentDate: () => string;
}

export class TaskStore {
  private storageKey: string;
  private taskStore: Map<string, TaskItemType[]>;
  private getCurrentDate: () => string;

  private constructor({ storageKey, getCurrentDate }: TaskStoreOptions) {
    this.storageKey = storageKey;
    this.getCurrentDate = getCurrentDate;
    this.taskStore = new Map();
  }

  public static async create(options: TaskStoreOptions): Promise<TaskStore> {
    const instance = new TaskStore(options);
    const weekStartTime = startOfWeek(new Date(), {
      weekStartsOn: 1,
    }).getTime();

    const storageData = await Storage.getItem(instance.storageKey);
    const parsedData: Record<string, TaskItemType[]> = storageData
      ? JSON.parse(storageData)
      : {};

    instance.taskStore = new Map(
      Object.entries(parsedData).filter(([date]) => {
        const currentTime = new Date(date).getTime();
        return currentTime >= weekStartTime;
      })
    );

    await instance.saveToStorage();
    return instance;
  }

  private async saveToStorage() {
    if (this.taskStore.size === 0) return;

    await Storage.setItem(
      this.storageKey,
      JSON.stringify(Object.fromEntries(this.taskStore))
    );
    this.notify();
  }

  private notify() {
    $(document).trigger('tasksUpdated', [this.taskStore]);
  }

  private sortTasks(tasks: TaskItemType[]) {
    return [...tasks].sort(
      (a, b) => Number(b.isLike) - Number(a.isLike) || a.date - b.date
    );
  }

  public getTasks(): TaskItemType[] {
    const currentDate = this.getCurrentDate();
    return this.taskStore.get(currentDate) || [];
  }

  public async setTasks(newTasks: TaskItemType[]) {
    const currentDate = this.getCurrentDate();
    this.taskStore.set(currentDate, newTasks);
    await this.saveToStorage();
  }

  public async addTask(newTask: TaskItemType) {
    const currentDate = this.getCurrentDate();
    const tasks = this.sortTasks([newTask, ...this.getTasks()]);
    this.taskStore.set(currentDate, tasks);
    await this.saveToStorage();
  }

  public async deleteTask(id: string) {
    const currentDate = this.getCurrentDate();
    const tasks = this.getTasks().filter((task) => task.id !== id);
    this.taskStore.set(currentDate, tasks);
    await this.saveToStorage();
  }

  public async toggleTaskLike(id: string, isLike: boolean) {
    const currentDate = this.getCurrentDate();
    const updatedTasks = this.getTasks().map((task) =>
      task.id === id ? { ...task, isLike } : task
    );
    this.taskStore.set(currentDate, this.sortTasks(updatedTasks));
    await this.saveToStorage();
  }
}
