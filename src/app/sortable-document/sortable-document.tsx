"use client";

import React, { useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  rectIntersection,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import Document from "./document";
import Nav from "./nav";

export default function SortableDocument() {
  const [items, setItems] = useState<{ id: string; type?: string }[]>([
    { id: "1_x493hjfie1", type: "input" },
    { id: "2_xxxxxxxxxxxx", type: "header" },
    { id: "3_alajdsad3", type: "paragraph" },
    { id: "4_alajdsad3", type: "paragraph" },
    { id: "5_alajdsad3", type: "paragraph" },
    { id: "6_alajdsad3", type: "paragraph" },
    // { id: "end", type: "end" },
  ]);
  const [dropAbove, setDropAbove] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="w-[screen] flex ">
        <Document id="main" items={items} dropAbove={dropAbove} />
        <Nav />
      </div>
    </DndContext>
  );

  function handleDragOver(event) {
    const { active, over } = event;
    if (!over) {
      return;
    }
    const activeIndex = items.findIndex((item) => item.id === active.id);
    const overIndex = items.findIndex((item) => item.id === over.id);
    const _dropAbove = activeIndex < 0 || overIndex < activeIndex;

    if (_dropAbove !== dropAbove) {
      setDropAbove(_dropAbove);
    }
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) {
      return;
    }

    const activeIndex = items.findIndex((item) => item.id === active.id);
    const overIndex = items.findIndex((item) => item.id === over.id);

    const newItems = [...items];
    const element = newItems[activeIndex];

    if (activeIndex >= 0) {
      newItems.splice(activeIndex, 1);
      if (overIndex >= 0) {
        newItems.splice(overIndex, 0, element);
      } else {
        newItems.push(element);
      }
    } else {
      if (overIndex >= 0) {
        newItems.splice(overIndex, 0, { id: `${items.length + 1}` });
      } else {
        newItems.push({ id: `${items.length + 1}` });
      }
    }

    setItems(newItems);
  }
}
