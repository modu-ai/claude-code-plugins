import '../styles/bottomReply.css';
import { nanoid } from 'nanoid';
import { isBefore, startOfDay } from 'date-fns';
import { type TaskItemType } from '../store/taskStore';
import { generateHapticFeedback } from '@apps-in-toss/web-framework';

interface BottomReplyComponentOptions {
  addTask: (task: TaskItemType) => void;
  getCurrentDate: () => string;
}

export class BottomReplyComponent {
  private addTask: (newTask: TaskItemType) => void;
  private $element: JQuery;
  private $input: JQuery;
  private isDisabled: boolean;
  private getCurrentDate: () => string;

  constructor({ addTask, getCurrentDate }: BottomReplyComponentOptions) {
    this.addTask = addTask;
    this.isDisabled = false;
    this.getCurrentDate = getCurrentDate;

    this.$element = $(`
      <form class="bottom-reply">
        <input class="input" type="text"/>
        <button class="button" type="submit">
          <i class="ri-add-line"></i>
        </button>
      </form>
    `);

    this.$input = this.$element.find('.input');
    this.$element.on('submit', (event) => this.handleSubmit(event));

    this.updateDisabledState();
  }

  private handleSubmit(e: JQuery.SubmitEvent) {
    e.preventDefault();
    const inputValue = this.$input.val()?.toString().trim() || '';

    if (inputValue === '') {
      return;
    }

    const createAtDate = new Date(this.getCurrentDate());

    const newTask: TaskItemType = {
      id: nanoid(),
      text: inputValue,
      isDone: false,
      isLike: false,
      date: createAtDate.getTime(),
    };

    this.addTask(newTask);
    generateHapticFeedback({ type: 'softMedium' });
    this.$input.val('');
  }

  public updateDisabledState() {
    const createAtDate = new Date(this.getCurrentDate());
    this.isDisabled = isBefore(
      startOfDay(createAtDate),
      startOfDay(new Date())
    );

    this.$input.prop('disabled', this.isDisabled);
    this.$element.find('button').prop('disabled', this.isDisabled);
  }

  public render(target: string) {
    $(target).append(this.$element);
  }
}
