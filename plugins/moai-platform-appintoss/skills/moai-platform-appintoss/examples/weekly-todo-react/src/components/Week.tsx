import { useMemo, useState } from 'react';
import { startOfWeek, endOfWeek, eachDayOfInterval, format } from 'date-fns';
import { generateHapticFeedback } from '@apps-in-toss/web-framework';
import clsx from 'clsx';
import style from './Week.module.css';

interface Props {
  onSelectDate: (date: string) => void;
}

const WEEK_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function Week({ onSelectDate }: Props) {
  const current = useMemo(() => Date.now(), []);
  const formattedToday = format(current, 'yyyy-MM-dd');
  const [selectDate, setSelectedDate] = useState<string>(formattedToday);

  const week = useMemo(() => {
    const start = startOfWeek(current, { weekStartsOn: 1 });
    const end = endOfWeek(current, { weekStartsOn: 1 });

    return eachDayOfInterval({ start, end }).map((day, i) => ({
      date: format(day, 'yyyy-MM-dd'),
      label: WEEK_LABELS[i],
    }));
  }, [current]);

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
    onSelectDate(date);
    generateHapticFeedback({ type: 'softMedium' });
  };

  return (
    <div className={style['week-container']}>
      <h3 className={style.month}>{format(current, 'MMMM')}</h3>
      <ul className={style.week}>
        {week.map(({ date, label }) => (
          <li
            key={date}
            className={clsx(
              style.date,
              selectDate === date && style['select-date'],
              formattedToday === date && style['today']
            )}
            onClick={() => handleSelectDate(date)}
          >
            <p className={style['date-labels']}>{label}</p>
            <p className={style['date-number']}>{date.slice(-2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
