// src/hooks/useTasks.js
import { useState } from "react";

export function useTasks(initialTasks = []) {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTask, setActiveTask] = useState(null);

  const openTask = task => setActiveTask(task);

  return {
    tasks,
    activeTask,
    openTask,
    setActiveTask,
  };
}
