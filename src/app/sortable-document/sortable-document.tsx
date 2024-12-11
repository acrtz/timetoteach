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
import { v4 as uuidv4 } from "uuid";
import Document from "./document";
import Nav from "./nav";

export default function SortableDocument() {
  const [items, setItems] = useState<{ id: string; type?: string }[]>([]);
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

    const updatedItems = [...items];
    const element = updatedItems[activeIndex] || createNewElement(active.id);

    if (activeIndex >= 0) {
      updatedItems.splice(activeIndex, 1);
    }
    if (overIndex >= 0) {
      updatedItems.splice(overIndex, 0, element);
    } else {
      updatedItems.push(element);
    }

    setItems(updatedItems);
  }
}

function createNewElement(type: string) {
  const element = {
    id: uuidv4(),
    type,
    ...defaultValues[type],
  };

  return element;
}

const defaultValues = {
  title: {
    value: "Title",
    align: "left",
  },
  subtitle: {
    value: "Subtitle",
    align: "left",
  },
  paragraph: {
    value:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
  },
  spacer: {
    height: 12,
  },
  text: {
    label: "Input label",
    placeholder: "Input placeholder",
    helperText: "Input helper text",
    required: false,
  },
  textarea: {
    label: "Textarea label",
    placeholder: "Textarea placeholder",
    helperText: "Textarea helper text",
    required: false,
    rows: 4,
  },
  number: {
    label: "Number label",
    placeholder: "Number placeholder",
    helperText: "Number helper text",
    required: false,
    min: 0,
    max: 100,
  },
  date: {
    label: "Date label",
    helperText: "Date helper text",
    required: false,
    min: null,
    max: null,
  },
  list: {
    items: ["Item 1", "Item 2", "Item 3"],
    variant: "unordered",
  },
  checkbox: {
    label: "Checkbox label",
    helperText: "Checkbox helper text",
    required: false,
  },
  checkboxgroup: {
    label: "Checkbox group label",
    helperText: "Checkbox group helper text",
    required: false,
    options: ["Option 1", "Option 2", "Option 3"],
    multiple: false,
    layout: "vertical",
  },
};
