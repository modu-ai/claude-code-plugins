import 'remixicon/fonts/remixicon.css';
import './styles/index.css';
import { DateStore } from './store/dateStore';
import { TaskStore } from './store/taskStore';
import { SortStateStore } from './store/sortStateStore';
import { WeekComponent } from './components/week';
import { BottomReplyComponent } from './components/bottomReply';
import { TaskListComponent } from './components/taskList';
import { TaskItemComponent } from './components/taskItem';
import { DeviceViewportHandler } from './components/deviceViewportHandler';

$(document).ready(async () => {
  new DeviceViewportHandler();

  const dateStore = new DateStore();
  const todoStore = await TaskStore.create({
    storageKey: 'TODOS',
    getCurrentDate: dateStore.getCurrentDate.bind(dateStore),
  });
  const doneTodoStore = await TaskStore.create({
    storageKey: 'DONE_TODOS',
    getCurrentDate: dateStore.getCurrentDate.bind(dateStore),
  });
  const sortStateStore = new SortStateStore();

  const week = new WeekComponent({
    onSelectDate: dateStore.setCurrentDate.bind(dateStore),
  });
  week.render('.week-container');

  const todoList = new TaskListComponent({
    title: 'ToDo',
    emptyMessage: 'Set a new goal for yourself! 🎯',
    setIsSorting: sortStateStore.setIsSorting.bind(sortStateStore),
    getTasks: todoStore.getTasks.bind(todoStore),
    setTasks: todoStore.setTasks.bind(todoStore),
    createTaskItem: (task) =>
      new TaskItemComponent({
        task,
        toggleTaskLike: todoStore.toggleTaskLike.bind(todoStore),
        deleteTask: todoStore.deleteTask.bind(todoStore),
        moveTaskToOtherList: doneTodoStore.addTask.bind(doneTodoStore),
        getIsSorting: sortStateStore.getIsSorting.bind(sortStateStore),
      }),
  });
  todoList.render('.task-container');

  const doneTodoList = new TaskListComponent({
    title: 'Done',
    emptyMessage: 'Still nothing done! Finish one today! 🌟',
    setIsSorting: sortStateStore.setIsSorting.bind(sortStateStore),
    getTasks: doneTodoStore.getTasks.bind(doneTodoStore),
    setTasks: doneTodoStore.setTasks.bind(doneTodoStore),
    createTaskItem: (task) =>
      new TaskItemComponent({
        task,
        toggleTaskLike: doneTodoStore.toggleTaskLike.bind(doneTodoStore),
        deleteTask: doneTodoStore.deleteTask.bind(doneTodoStore),
        moveTaskToOtherList: todoStore.addTask.bind(todoStore),
        getIsSorting: sortStateStore.getIsSorting.bind(sortStateStore),
      }),
  });
  doneTodoList.render('.task-container');

  const bottomReply = new BottomReplyComponent({
    addTask: todoStore.addTask.bind(todoStore),
    getCurrentDate: dateStore.getCurrentDate.bind(dateStore),
  });
  bottomReply.render('#root');

  $(document).on('dateUpdated', () => {
    todoList.updateTaskList();
    doneTodoList.updateTaskList();
    bottomReply.updateDisabledState();
  });
});
