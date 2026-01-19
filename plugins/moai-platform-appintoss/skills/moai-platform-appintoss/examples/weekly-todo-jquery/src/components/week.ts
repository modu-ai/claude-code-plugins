import '../styles/week.css';
import { startOfWeek, endOfWeek, eachDayOfInterval, format } from 'date-fns';
import { generateHapticFeedback } from '@apps-in-toss/web-framework';

interface WeekComponentOptions {
  onSelectDate: (day: string) => void;
}

interface Date {
  date: string;
  label: string;
}

export class WeekComponent {
  private $element: JQuery;
  private current: number;
  private selectedDate: string;
  private formattedToday: string;
  private week: Date[];
  private WEEK_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  private onSelectDate: (date: string) => void;

  constructor({ onSelectDate }: WeekComponentOptions) {
    this.current = Date.now();
    this.formattedToday = format(this.current, 'yyyy-MM-dd');
    this.selectedDate = this.formattedToday;
    this.onSelectDate = onSelectDate;

    const start = startOfWeek(this.current, { weekStartsOn: 1 });
    const end = endOfWeek(this.current, { weekStartsOn: 1 });
    this.week = eachDayOfInterval({ start, end }).map((day, i) => ({
      date: format(day, 'yyyy-MM-dd'),
      label: this.WEEK_LABELS[i],
    }));

    this.$element = $(`
      <h3 class="month">${format(this.current, 'MMMM')}</h3>
      <ul class="week">
        ${this.week
          .map(({ date, label }) => {
            const isSelected = this.selectedDate === date ? 'select-date' : '';
            const isToday = this.formattedToday === date ? 'today' : '';
            const classList = ['date', isSelected, isToday]
              .filter(Boolean)
              .join(' ');

            return `
              <li class="${classList}" data-date="${date}">
                <p class="date-labels">${label}</p>
                <p class="date-number">${date.slice(-2)}</p>
              </li>
            `;
          })
          .join('')}
      </ul>
  `);

    this.$element.find('.date').on('click', (e) => this.handleDateClick(e));
  }

  private handleDateClick(e: JQuery.ClickEvent) {
    const date = $(e.currentTarget).data('date');

    this.selectedDate = date;
    this.onSelectDate(date);
    this.$element.find('.date').removeClass('select-date');
    this.$element.find(`[data-date="${date}"]`).addClass('select-date');
    generateHapticFeedback({ type: 'softMedium' });
  }

  render(target: string) {
    $(target).append(this.$element);
  }
}
