import { type TaskItemType } from '../hooks/useTaskState';
import clsx from 'clsx';
import { Checkbox } from './Checkbox';
import { generateHapticFeedback } from '@apps-in-toss/web-framework';
import { SwipeGestureHandler } from './SwipeGestureHandler';
import style from './TaskItem.module.css';

interface Props {
  task: TaskItemType;
  moveTaskToOtherList: (task: TaskItemType) => void;
  toggleTaskLike: (id: string, isLike: boolean) => void;
  deleteTask: (id: string) => void;
  isSorting: boolean;
}

export function TaskItem({
  task,
  moveTaskToOtherList,
  toggleTaskLike,
  deleteTask,
  isSorting,
}: Props) {
  const handleLikeToggle = (like: boolean) => {
    toggleTaskLike(task.id, like);
    generateHapticFeedback({ type: 'softMedium' });
  };

  const handleDoneToggle = (done: boolean) => {
    deleteTask(task.id);
    moveTaskToOtherList({ ...task, isDone: done });
    generateHapticFeedback({ type: 'softMedium' });
  };

  const handleDeleteTask = () => {
    deleteTask(task.id);
    generateHapticFeedback({ type: 'softMedium' });
  };

  return (
    <li className={clsx(style['task-item'], task.isLike && 'not-draggable')}>
      <SwipeGestureHandler isSorting={isSorting}>
        <div className={style['task-inner']}>
          <Checkbox
            initialValue={task.isDone}
            onCheckedChange={handleDoneToggle}
          >
            <i className="ri-checkbox-blank-circle-line inactive-icon"></i>
            <i className="ri-checkbox-circle-line active-icon"></i>
          </Checkbox>
          <p
            className={clsx(
              task.isDone ? style['done-text'] : style['todo-text']
            )}
          >
            {task.text}
          </p>
          <Checkbox
            initialValue={task.isLike}
            className={style['task-like']}
            onCheckedChange={handleLikeToggle}
          >
            <i className="ri-star-fill active-icon"></i>
            <i className="ri-star-line inactive-icon"></i>
          </Checkbox>
          <div className="draggable-handle">
            <i className="ri-draggable"></i>
          </div>
        </div>
      </SwipeGestureHandler>
      <button className={style['delete-button']} onClick={handleDeleteTask}>
        삭제
      </button>
    </li>
  );
}
