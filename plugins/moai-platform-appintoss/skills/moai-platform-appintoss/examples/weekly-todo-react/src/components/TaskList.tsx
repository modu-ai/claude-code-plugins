import { ReactSortable, type MoveEvent } from 'react-sortablejs';
import { type TaskItemType } from '../hooks/useTaskState';
import { generateHapticFeedback } from '@apps-in-toss/web-framework';
import style from './TaskList.module.css';

interface Props {
  title: string;
  items: TaskItemType[];
  setTasks: (tasks: TaskItemType[]) => void;
  setIsSorting: (bool: boolean) => void;
  children: React.ReactNode;
  emptyMessage?: string;
}

export function TaskList({
  title,
  items,
  setTasks,
  setIsSorting,
  children,
  emptyMessage,
}: Props) {
  const handleDragEnd = (newState: TaskItemType[]) => {
    setTasks(newState);
    setIsSorting(false);
    generateHapticFeedback({ type: 'softMedium' });
  };

  const handleMoveCheck = (event: MoveEvent) => {
    const isRelatedBlocked = event.related.classList.contains('not-draggable');
    const isDraggedBlocked = event.dragged.classList.contains('not-draggable');

    const draggable = !(isRelatedBlocked || isDraggedBlocked);

    return draggable;
  };

  return (
    <div>
      <h3 className={style.title}>{title}</h3>
      <ReactSortable
        tag={'ul'}
        list={items}
        handle=".draggable-handle"
        setList={handleDragEnd}
        onStart={() => setIsSorting(true)}
        onMove={handleMoveCheck}
        animation={200}
        className={style['task-list']}
      >
        {children}
      </ReactSortable>
      {items.length === 0 && (
        <div className={style['task-empty']}>{emptyMessage}</div>
      )}
    </div>
  );
}
