<script setup lang="ts">
import { ref, computed } from 'vue';
import { format } from 'date-fns';
import { useTaskState } from './composables/useTaskState';
import Week from './components/Week.vue';
import TaskList from './components/TaskList.vue';
import TaskItem from './components/TaskItem.vue';
import BottomReply from './components/BottomReply.vue';
import DeviceViewport from './components/DeviceViewport.vue';

const selectDate = ref<string>(format(Date.now(), 'yyyy-MM-dd'));

const {
  tasks: todos,
  addTask: addTodo,
  toggleTaskLike: toggleTodoLike,
  deleteTask: deleteTodo,
} = useTaskState({
  storageKey: 'TODOS',
  currentDate: computed(() => selectDate.value),
});

const {
  tasks: doneTodos,
  addTask: addDoneTodo,
  toggleTaskLike: toggleDoneTodoLike,
  deleteTask: deleteDoneTodo,
} = useTaskState({
  storageKey: 'DONE_TODOS',
  currentDate: computed(() => selectDate.value),
});

const isSorting = ref<boolean>(false);
</script>

<template>
  <DeviceViewport />
  <Week @update:selectDate="(date:string) => (selectDate = date)" />
  <div className="task-container">
    <TaskList
      title="ToDo"
      :items="todos"
      @update:isSorting="(value:boolean) => (isSorting = value)"
      emptyMessage="Set a new goal for yourself! 🎯"
    >
      <template #default="{ item: todo }">
        <TaskItem
          :key="todo.id"
          :task="todo"
          @moveTaskToOtherList="addDoneTodo"
          @toggleTaskLike="toggleTodoLike"
          @deleteTask="deleteTodo"
          :isSorting="isSorting"
        />
      </template>
    </TaskList>
    <TaskList
      title="Done"
      :items="doneTodos"
      @update:isSorting="(value:boolean) => (isSorting = value)"
      emptyMessage="Still nothing done! Finish one today! 🌟"
    >
      <template #default="{ item: doneTodo }">
        <TaskItem
          :key="doneTodo.id"
          :task="doneTodo"
          @moveTaskToOtherList="addTodo"
          @toggleTaskLike="toggleDoneTodoLike"
          @deleteTask="deleteDoneTodo"
          :isSorting="isSorting"
        />
      </template>
    </TaskList>
  </div>
  <BottomReply @addTodo="addTodo" :createAt="new Date(selectDate)" />
</template>

<style scoped>
.task-container {
  width: 100%;
  height: 70%;
  flex: 1;
  padding-block: 40px;
  padding-inline: 20px;
  display: flex;
  flex-direction: column;
  gap: 80px;
  background-color: var(--color-gray-200);
  border-top-left-radius: var(--rounded-lg);
  border-top-right-radius: var(--rounded-lg);
  overflow: hidden auto;
}
</style>
