import React from "react";
import { useDraggable } from "@dnd-kit/core";

export function Item(props) {
  return <div>{props.children}</div>;
}

export default function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: props.metaData,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-card ${transform ? "opacity-50 border" : ""}`}
    >
      <Item id={props.id} children={props.children} />
    </div>
  );
}
