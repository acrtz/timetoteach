"use client";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "./ui/button";
export function DocumentSidebar() {
  return (
    <div className="h-screen w-[400px] border-l bg-card p-8">
      <Draggable />
    </div>
  );
}

function Draggable() {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "unique-id",
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      button
    </Button>
  );
}
