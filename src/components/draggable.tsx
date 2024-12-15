import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

export default function Draggable(props: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: 0.7,
      }
    : undefined;

  return (
    <div
      id={props.id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn("bg-card", props.className)}
    >
      {props.children}
    </div>
  );
}
