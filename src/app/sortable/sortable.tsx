"use client";

import React, { useState } from "react";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from "./sortable-item";
import { Item } from "./item";

export function SortableExample() {
  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState([
    { id: "1", value: "button" },
    { id: "2", value: "title" },
    { id: "3", value: "input" },
  ]);
  const sensors = useSensors(useSensor(PointerSensor));
  const activeItem = items.find((item) => item.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="w-[1000px] max-w-[90%] mx-auto mt-20">
        <div className="aspect-[1/1.414] rounded-xl border bg-card text-card-foreground shadow  overflow-hidden pt-[8%] px-[12%]">
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((item) => (
              <SortableItem
                key={item.id}
                id={item.id}
                item={item}
                active={activeItem?.id === item.id}
              />
            ))}
          </SortableContext>
          <DragOverlay>
            {activeItem ? <Item id={activeItem.id} item={activeItem} /> : null}
          </DragOverlay>
        </div>
      </div>
    </DndContext>
  );

  function handleDragStart(event: any) {
    const { active } = event;

    setActiveId(active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }
}
