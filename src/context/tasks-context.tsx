"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { type Task } from "../components/kanban-board/task-card";

import { toast } from "sonner"

interface TasksContextProps {
  todos: Task[];
  refetchTasks: () => void;
  addTask: (task: Omit<Task, "id">) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

const TasksContext = createContext<TasksContextProps | undefined>(undefined);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const fetchTasks = api.todo.fetch.useQuery();
  const addTaskMutation = api.todo.new.useMutation();
  const deleteTaskMutation = api.todo.delete.useMutation();

  const [todos, setTodos] = useState<Task[]>([]);

  useEffect(() => {
    if (fetchTasks.data) {
      setTodos(fetchTasks.data.map((task) => ({
        id: task.id,
        content: task.content,
        columnId: task.columnId,
      })));
    }
  }, [fetchTasks.data]);

  const refetchTasks = () => {
    fetchTasks.refetch().catch(
      (error) => toast.error(`Error refetching tasks: ${error}`)
    );
  };

  const addTask = async (task: Omit<Task, "id">) => {
    try {
      await addTaskMutation.mutateAsync(task);
      refetchTasks();
      toast.success("Task added successfully");
    } catch (error) {
      toast.error(`Error adding task: ${error}`);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await deleteTaskMutation.mutateAsync({ id });
      refetchTasks();
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error(`Error deleting task: ${error}`);
    }
  };

  return (
    <TasksContext.Provider value={{ todos, refetchTasks, addTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
