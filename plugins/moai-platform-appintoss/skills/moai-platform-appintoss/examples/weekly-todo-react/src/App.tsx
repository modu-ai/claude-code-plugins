import { useState } from 'react';
import { format } from 'date-fns';
import { useTaskState } from './hooks/useTaskState';
import { Week } from './components/Week';
import { TaskList } from './components/TaskList';
import { TaskItem } from './components/TaskItem';
import { BottomReply } from './components/BottomReply';
import { DeviceViewport } from './components/DeviceViewport';

function App() {
  const [selectDate, setSelectDate] = useState<string>(
    format(Date.now(), 'yyyy-MM-dd')
  );

  const todo = useTaskState({ storageKey: 'TODOS', currentDate: selectDate });
  const done = useTaskState({
    storageKey: 'DONE_TODOS',
    currentDate: selectDate,
  });

  const [isSorting, setIsSorting] = useState<boolean>(false);

  return (
    <>
      <DeviceViewport />
      <Week onSelectDate={setSelectDate} />
      <div className="task-container">
        <TaskList
          title="ToDo"
          items={todo.tasks}
          setTasks={todo.setTasks}
          setIsSorting={setIsSorting}
          emptyMessage="Set a new goal for yourself! 🎯"
        >
          {todo.tasks.map((item) => (
            <TaskItem
              key={item.id}
              task={item}
              moveTaskToOtherList={done.addTask}
              toggleTaskLike={todo.toggleTaskLike}
              deleteTask={todo.deleteTask}
              isSorting={isSorting}
            />
          ))}
        </TaskList>
        <TaskList
          title="Done"
          items={done.tasks}
          setTasks={done.setTasks}
          setIsSorting={setIsSorting}
          emptyMessage="Still nothing done! Finish one today! 🌟"
        >
          {done.tasks.map((item) => (
            <TaskItem
              key={item.id}
              task={item}
              moveTaskToOtherList={todo.addTask}
              toggleTaskLike={done.toggleTaskLike}
              deleteTask={done.deleteTask}
              isSorting={isSorting}
            />
          ))}
        </TaskList>
      </div>
      <BottomReply addTask={todo.addTask} createAtDate={new Date(selectDate)} />
    </>
  );
}

export default App;
