"use client";

import { KanbanColumn } from '@/components/kanban/KanbanColumn';
import type { Task, TaskStatus } from '@/lib/types';
import { mockTasks, mockProjects } from '@/data/mockData';
import { notFound } from 'next/navigation';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core'; // Basic DND context, full implementation is complex
import { useState, useEffect } from 'react';

interface KanbanPageProps {
  params: { projectId: string };
}

const KANBAN_COLUMNS_ORDER: TaskStatus[] = ['todo', 'inprogress', 'review', 'done'];

export default function KanbanPage({ params }: KanbanPageProps) {
  const project = mockProjects.find(p => p.id === params.projectId);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
     // Simulate fetching tasks for the project
    const projectTasks = mockTasks.filter(task => task.projectId === params.projectId);
    setTasks(projectTasks);
  }, [params.projectId]);


  if (!project) {
    notFound();
  }

  // Basic DND handler - full implementation requires droppable columns and draggable items
  // This is a placeholder to show where DND logic would go.
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      // Find task and new column/status
      // Update task status and re-render
      // This is highly simplified for now.
      console.log(`Task ${active.id} dragged over ${over.id}`);
      // For a real implementation, you'd update the task's status and potentially its order.
      // Example:
      // setTasks(prevTasks => {
      //   const taskIndex = prevTasks.findIndex(t => t.id === active.id);
      //   const newStatus = over.id as TaskStatus; // Assuming over.id is the column status
      //   if (taskIndex > -1) {
      //     const updatedTasks = [...prevTasks];
      //     updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], status: newStatus };
      //     return updatedTasks;
      //   }
      //   return prevTasks;
      // });
       alert("Drag and drop functionality is a placeholder. Task status updating is not implemented in this demo.");
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex gap-4 p-1">
          {KANBAN_COLUMNS_ORDER.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              tasks={tasks.filter((task) => task.status === status)}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </DndContext>
  );
}
