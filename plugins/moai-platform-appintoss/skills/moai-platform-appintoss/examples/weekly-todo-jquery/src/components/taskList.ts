import '../styles/taskList.css';
import Sortable from 'sortablejs';
import { TaskItemType } from '../store/taskStore';
import { type TaskItemComponent } from './taskItem';
import { generateHapticFeedback } from '@apps-in-toss/web-framework';

interface TaskListComponentOptions {
  title: string;
  emptyMessage: string;
  setIsSorting: (state: boolean) => void;
  getTasks: () => TaskItemType[];
  setTasks: (tasks: TaskItemType[]) => void;
  createTaskItem: (task: TaskItemType) => TaskItemComponent;
}

export class TaskListComponent {
  private $element: JQuery;
  private setIsSorting: (state: boolean) => void;
  private getTasks: () => TaskItemType[];
  private setTasks: (tasks: TaskItemType[]) => void;
  private createTaskItem: (task: TaskItemType) => TaskItemComponent;

  constructor({
    title,
    emptyMessage,
    setIsSorting,
    getTasks,
    setTasks,
    createTaskItem,
  }: TaskListComponentOptions) {
    this.setIsSorting = setIsSorting;
    this.getTasks = getTasks;
    this.setTasks = setTasks;
    this.createTaskItem = createTaskItem;

    this.$element = $(
      `<div>
        <h3 class="title">${title}</h3>
        <ul class="task-list"></ul>
        <div class="task-empty" style="display: none;">${emptyMessage}</div>
      </div>`
    );

    this.updateTaskList();
    this.initSortable();
    $(document).on('tasksUpdated', () => this.updateTaskList());
  }

  private initSortable() {
    const taskListEl = this.$element.find('.task-list').get(0);
    if (taskListEl != null) {
      Sortable.create(taskListEl, {
        animation: 200,
        handle: '.draggable-handle',
        onStart: () => {
          this.setIsSorting(true);
        },
        onEnd: () => {
          this.saveNewOrder();
          this.setIsSorting(false);
          generateHapticFeedback({ type: 'softMedium' });
        },
        onMove: this.handleMoveCheck,
      });
    }
  }

  private handleMoveCheck(event: any) {
    const isRelatedBlocked =
      event.related.classList.value.includes('not-draggable');
    const isDraggedBlocked =
      event.dragged.classList.value.includes('not-draggable');

    const draggable = !(isRelatedBlocked || isDraggedBlocked);

    return draggable;
  }

  private saveNewOrder() {
    const newOrder: TaskItemType[] = [];
    this.$element.find('.task-item').each((_, element) => {
      const taskId = $(element).data('id');
      const task = this.getTasks().find(({ id }) => id === taskId);
      if (task) newOrder.push(task);
    });
    this.setTasks(newOrder);
  }

  public updateTaskList() {
    const tasks: TaskItemType[] = this.getTasks();
    const $taskList = this.$element.find('.task-list');
    $taskList.empty();

    if (tasks.length === 0) {
      this.$element.find('.task-empty').show();
    } else {
      this.$element.find('.task-empty').hide();
    }

    tasks.forEach((task) => {
      const taskItem = this.createTaskItem(task);
      $taskList.append(taskItem.render());
    });
  }

  public render(target: string) {
    $(target).append(this.$element);
  }
}
