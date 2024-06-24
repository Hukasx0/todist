import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cva } from "class-variance-authority";
import { GripVertical, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ColumnId } from "./kanban-board";
import { Credenza, CredenzaBody, CredenzaClose, CredenzaContent, CredenzaFooter, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "../ui/credenza";
import { api } from "@/trpc/react";
import { useTasks } from "@/context/tasks-context";

export interface Task {
  id: UniqueIdentifier;
  columnId: ColumnId;
  content: string;
}

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
}

export type TaskType = "Task";

export interface TaskDragData {
  type: TaskType;
  task: Task;
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    } satisfies TaskDragData,
    attributes: {
      roleDescription: "Task",
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva("", {
    variants: {
      dragging: {
        over: "ring-2 opacity-30",
        overlay: "ring-2 ring-primary",
      },
    },
  });

  const { deleteTask } = useTasks();

  async function onSubmit(task: Task) {
    await deleteTask(task.id.toString());
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <CardHeader className="px-3 py-3 space-between flex flex-row border-b-2 border-secondary relative">
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className="p-1 text-secondary-foreground/50 -ml-2 h-auto cursor-grab"
        >
          <span className="sr-only">Move task</span>
          <GripVertical />
        </Button>
        <Credenza>
            <CredenzaTrigger asChild>
                <Button variant={"ghost"} 
                  className="p-1 text-secondary-foreground/50 h-auto cursor-grab"
                  onClick={() => {}}>
                  <X className="h-5 w-5" />
                </Button>
            </CredenzaTrigger>
            <CredenzaContent>
            <CredenzaHeader>
                <CredenzaTitle>Delete task</CredenzaTitle>
                </CredenzaHeader>
              <CredenzaBody>
                  <p>Are you sure you want to delete this task? (this action cannot be undone)</p>
                </CredenzaBody>
                <CredenzaFooter>
                  <Button type="submit" variant={"destructive"} onClick={() => onSubmit(task)}>Delete</Button>
                <CredenzaClose asChild>
                    <Button type="submit" variant={"outline"}>Close</Button>
                </CredenzaClose>
                </CredenzaFooter>
            </CredenzaContent>
            </Credenza>
        <Badge variant={"outline"} className="ml-auto font-semibold">
          Task
        </Badge>
      </CardHeader>
      <CardContent className="px-3 pt-3 pb-6 text-left whitespace-pre-wrap">
        {task.content}
      </CardContent>
    </Card>
  );
}