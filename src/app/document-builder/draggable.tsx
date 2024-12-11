import React from "react";
import { useDraggable } from "@dnd-kit/core";

export default function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      id={props.id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-card hover:bg-violet-50 rounded ${
        transform ? "opacity-50 border" : ""
      } ${props.className}`}
    >
      {props.children}
    </div>
  );
}
