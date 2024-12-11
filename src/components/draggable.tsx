import React from "react";
import { useDraggable } from "@dnd-kit/core";

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
        opacity: 0.5,
      }
    : undefined;

  return (
    <div
      id={props.id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={props.className}
    >
      {props.children}
    </div>
  );
}
