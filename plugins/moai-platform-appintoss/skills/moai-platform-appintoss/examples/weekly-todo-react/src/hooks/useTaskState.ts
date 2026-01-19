import { startOfWeek } from 'date-fns';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Storage } from '@apps-in-toss/web-framework';

export interface TaskItemType {
  id: string;
  text: string;
  isDone: boolean;
  isLike: boolean;
  date: number;
}

interface Props {
  storageKey: string;
  currentDate: string;
}

export function useTaskState({ storageKey, currentDate }: Props) {
  const weekStartTime = useMemo(() => {
    return startOfWeek(new Date(), { weekStartsOn: 1 }).getTime();
  }, []);

  const taskStoreRef = useRef<Map<string, TaskItemType[]>>(new Map());
  const [tasks, setTasks] = useState<TaskItemType[]>([]);

  useEffect(() => {
    const fetchStorage = async () => {
      try {
        const storageData = await Storage.getItem(storageKey);

        const parsedData: Record<string, TaskItemType[]> = storageData
          ? JSON.parse(storageData)
          : {};
        const filteredMap = Object.entries(parsedData).filter(([date]) => {
          const currentTime = new Date(date).getTime();
          return currentTime >= weekStartTime;
        });
        const map = new Map(filteredMap);
        taskStoreRef.current = map;
        setTasks(taskStoreRef.current.get(currentDate) || []);
      } catch (e) {
        console.error('localStorage parse error:', e);
      }
    };

    fetchStorage();
  }, [storageKey, currentDate, weekStartTime]);

  useEffect(() => {
    taskStoreRef.current.set(currentDate, tasks);

    const persistTaskStore = async () => {
      if (taskStoreRef.current.size === 0) {
        return;
      }

      try {
        const serialized = JSON.stringify(
          Object.fromEntries(taskStoreRef.current)
        );
        await Storage.setItem(storageKey, serialized);
      } catch (e) {
        console.error('Failed to persist tasks to storage:', e);
      }
    };
    persistTaskStore();
  }, [tasks, storageKey, currentDate]);

  const sortTasks = (tasks: TaskItemType[]) =>
    [...tasks].sort(
      (a, b) => Number(b.isLike) - Number(a.isLike) || a.date - b.date
    );

  const addTask = (newTask: TaskItemType) => {
    setTasks((prev) => sortTasks([newTask, ...prev]));
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTaskLike = (id: string, isLike: boolean) => {
    setTasks((prev) =>
      sortTasks(
        prev.map((task) => (task.id === id ? { ...task, isLike } : task))
      )
    );
  };

  return {
    tasks,
    setTasks,
    addTask,
    deleteTask,
    toggleTaskLike,
  };
}
