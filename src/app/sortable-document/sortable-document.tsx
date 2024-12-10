"use client";

import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  rectIntersection,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import Document from "./document";
import Nav from "./nav";
import { Item } from "./sortable-item";

const defaultAnnouncements = {
  onDragStart(id) {
    console.log(`Picked up draggable item ${id}.`);
  },
  onDragOver(id, overId) {
    if (overId) {
      console.log(
        `Draggable item ${id} was moved over droppable area ${overId}.`
      );
      return;
    }

    console.log(`Draggable item ${id} is no longer over a droppable area.`);
  },
  onDragEnd(id, overId) {
    if (overId) {
      console.log(
        `Draggable item ${id} was dropped over droppable area ${overId}`
      );
      return;
    }

    console.log(`Draggable item ${id} was dropped.`);
  },
  onDragCancel(id) {
    console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
  },
};

export default function SortableDocument() {
  const [items, setItems] = useState<{ id: string; type?: string }[]>([
    { id: "1", type: "input" },
    { id: "2", type: "header" },
    { id: "3", type: "paragraph" },
    { id: "end", type: "end" },
  ]);
  const [activeId, setActiveId] = useState();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      announcements={defaultAnnouncements}
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      // onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="w-[screen] flex ">
        <Document id="main" items={items} />
        <Nav />
      </div>
      <DragOverlay>
        {activeId ? (
          <Item id={activeId}>
            <div className="bg-yellow-500 h-20 w-20">MOVING</div>
          </Item>
        ) : null}
      </DragOverlay>
    </DndContext>
  );

  function findContainer(id) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  }

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) {
      return;
    }

    const activeIndex = items.findIndex((item) => item.id === active.id);
    const overIndex = items.findIndex((item) => item.id === over.id);

    if (overIndex === -1) {
      return;
    }

    if (activeIndex !== overIndex) {
      setItems((items) => {
        console.log("before", items);
        const newItems = [
          ...items.slice(0, overIndex),
          { id: `${items.length + 1}` },
          ...items.slice(overIndex),
        ];
        console.log("after", newItems);
        return newItems;
      });
    }

    setActiveId(null);
  }
}
