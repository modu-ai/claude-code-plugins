import { ref, computed, watch, type ComputedRef, onMounted } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { startOfWeek } from 'date-fns';
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
  currentDate: ComputedRef<string>;
}

export function useTaskState({ storageKey, currentDate }: Props) {
  const weekStartTime = startOfWeek(new Date(), { weekStartsOn: 1 }).getTime();
  const taskStore = ref<Map<string, TaskItemType[]>>(new Map());
  const tasks = ref<TaskItemType[]>([]);

  onMounted(async () => {
    try {
      const storageData = await Storage.getItem(storageKey);
      const parsedData: Record<string, TaskItemType[]> = storageData
        ? JSON.parse(storageData)
        : {};
      const filteredMap = Object.entries(parsedData).filter(([date]) => {
        const currentTime = new Date(date).getTime();
        return currentTime >= weekStartTime;
      });
      taskStore.value = new Map(filteredMap);
      tasks.value = taskStore.value.get(currentDate.value) || [];
    } catch (e) {
      console.error('storage parse error:', e);
    }
  });

  watch(
    currentDate,
    (newDate) => {
      tasks.value = taskStore.value.get(newDate) || [];
    },
    { immediate: true }
  );

  const saveTasksToStorage = useDebounceFn(async () => {
    taskStore.value.set(currentDate.value, tasks.value);

    if (taskStore.value.size === 0) {
      return;
    }

    try {
      await Storage.setItem(
        storageKey,
        JSON.stringify(Object.fromEntries(taskStore.value))
      );
    } catch (e) {
      console.error('Failed to persist tasks to storage:', e);
    }
  }, 300);

  watch(tasks, saveTasksToStorage, { deep: true });

  const sortTasks = (tasks: TaskItemType[]) =>
    [...tasks].sort(
      (a, b) => Number(b.isLike) - Number(a.isLike) || a.date - b.date
    );

  const addTask = (newTask: TaskItemType) => {
    tasks.value = sortTasks([newTask, ...tasks.value]);
  };

  const deleteTask = (id: string) => {
    tasks.value = tasks.value.filter((task) => task.id !== id);
  };

  const toggleTaskLike = (id: string, isLike: boolean) => {
    tasks.value = sortTasks(
      tasks.value.map((task) => (task.id === id ? { ...task, isLike } : task))
    );
  };

  return {
    tasks: computed(() => tasks.value),
    addTask,
    deleteTask,
    toggleTaskLike,
  };
}
