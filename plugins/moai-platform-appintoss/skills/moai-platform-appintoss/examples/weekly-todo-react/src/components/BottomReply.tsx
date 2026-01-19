import { useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { isBefore, startOfDay } from 'date-fns';
import { type TaskItemType } from '../hooks/useTaskState';
import { generateHapticFeedback } from '@apps-in-toss/web-framework';
import style from './BottomReply.module.css';

interface Props {
  addTask: (task: TaskItemType) => void;
  createAtDate: Date;
}

export function BottomReply({ addTask, createAtDate }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isDisabled = isBefore(startOfDay(createAtDate), startOfDay(new Date()));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current || !inputRef.current.value) {
      return;
    }

    addTask({
      id: nanoid(),
      text: inputRef.current.value,
      isDone: false,
      isLike: false,
      date: createAtDate.getTime(),
    });
    generateHapticFeedback({ type: 'softMedium' });

    inputRef.current.value = '';
  };

  useEffect(() => {
    if (inputRef.current != null) {
      inputRef.current.value = '';
    }
  }, [createAtDate]);

  return (
    <form className={style['bottom-reply']} onSubmit={handleSubmit}>
      <input
        className={style.input}
        type="text"
        ref={inputRef}
        disabled={isDisabled}
      />
      <button className={style.button} type="submit" disabled={isDisabled}>
        <i className="ri-add-line"></i>
      </button>
    </form>
  );
}
