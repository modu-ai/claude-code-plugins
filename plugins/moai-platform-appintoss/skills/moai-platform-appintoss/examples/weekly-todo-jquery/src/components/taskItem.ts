import '../styles/taskItem.css';
import { TaskItemType } from '../store/taskStore';
import { CheckboxComponent } from './checkbox';
import { SwipeGestureHandlerComponent } from './swipeGestureHandler';
import { generateHapticFeedback } from '@apps-in-toss/web-framework';

interface TaskItemComponentOptions {
  task: TaskItemType;
  toggleTaskLike: (id: string, isLike: boolean) => void;
  deleteTask: (id: string) => void;
  moveTaskToOtherList: (task: TaskItemType) => void;
  getIsSorting: () => boolean;
}

export class TaskItemComponent {
  private $element: JQuery;
  private task: TaskItemType;
  private toggleTaskLike: (id: string, isLike: boolean) => void;
  private deleteTask: (id: string) => void;
  private moveTaskToOtherList: (task: TaskItemType) => void;
  private getIsSorting: () => boolean;

  constructor({
    task,
    toggleTaskLike,
    deleteTask,
    moveTaskToOtherList,
    getIsSorting,
  }: TaskItemComponentOptions) {
    this.task = task;
    this.toggleTaskLike = toggleTaskLike;
    this.deleteTask = deleteTask;
    this.moveTaskToOtherList = moveTaskToOtherList;
    this.getIsSorting = getIsSorting;

    const taskInnerHTML = `
      <div class="task-inner">
        <div class="checkbox-container done-checkbox"></div>
        <p class="${this.task.isDone ? 'done-text' : 'todo-text'}">
          ${this.task.text}
        </p>
        <div class="checkbox-container like-checkbox task-like"></div>
        <div class="draggable-handle">
          <i class="ri-draggable"></i>
        </div>
      </div>
    `;

    const swipeHandler = new SwipeGestureHandlerComponent({
      getIsSorting: this.getIsSorting,
      children: taskInnerHTML,
    });

    this.$element = $(`
      <li class="task-item ${
        this.task.isLike ? 'not-draggable' : ''
      }" data-id="${this.task.id}">
      </li>
    `);

    this.$element.append(swipeHandler.render());
    this.$element.append(`<button class="delete-button">삭제</button>`);

    this.initCheckboxes();
    this.handleDeleteTask();
  }

  private initCheckboxes() {
    const doneCheckbox = new CheckboxComponent({
      initialValue: this.task.isDone,
      onCheckedChange: (done: boolean) => {
        this.deleteTask(this.task.id);
        this.moveTaskToOtherList({ ...this.task, isDone: done });
        generateHapticFeedback({ type: 'softMedium' });
      },
      children: `
        <i class="ri-checkbox-blank-circle-line inactive-icon"></i>
        <i class="ri-checkbox-circle-line active-icon"></i>
      `,
    });
    this.$element.find('.done-checkbox').append(doneCheckbox.render());

    const likeCheckbox = new CheckboxComponent({
      initialValue: this.task.isLike,
      onCheckedChange: (like: boolean) => {
        this.toggleTaskLike(this.task.id, like);
        generateHapticFeedback({ type: 'softMedium' });
      },
      children: `
        <i class="ri-star-line inactive-icon"></i>
        <i class="ri-star-fill active-icon"></i>
      `,
    });
    this.$element.find('.like-checkbox').append(likeCheckbox.render());
  }

  private handleDeleteTask() {
    this.$element.on('click', '.delete-button', () => {
      this.deleteTask(this.task.id);
      generateHapticFeedback({ type: 'softMedium' });
    });
  }

  public render(): JQuery {
    return this.$element;
  }
}
