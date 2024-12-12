"use client";

import React, { useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  rectIntersection,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Document from "./document";
import Nav from "./nav";
import { BlockEnum, BlockType } from "@/types";
import { createNewBlock } from "@/lib/blocks";

export default function DocumentBuilder() {
  const [blocks, setBlocks] = useState<BlockType[]>([]);
  const [dropAbove, setDropAbove] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<BlockType | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function deleteBlock(id: string) {
    setBlocks((prev) => prev.filter((block) => block.id !== id));
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="w-screen flex ">
        <Document
          blocks={blocks}
          dropAbove={dropAbove}
          deleteBlock={deleteBlock}
          setSelectedBlock={setSelectedBlock}
        />
        <Nav
          selectedBlock={selectedBlock}
          setSelectedBlock={setSelectedBlock}
        />
      </div>
    </DndContext>
  );

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) {
      return;
    }
    const activeIndex = blocks.findIndex((item) => item.id === active.id);
    const overIndex = blocks.findIndex((item) => item.id === over.id);
    const _dropAbove = activeIndex < 0 || overIndex < activeIndex;

    if (_dropAbove !== dropAbove) {
      setDropAbove(_dropAbove);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) {
      return;
    }

    const currentIndex = blocks.findIndex((item) => item.id === active.id);
    const newIndex = blocks.findIndex((item) => item.id === over.id);

    const updatedBlocks = [...blocks];

    const block =
      updatedBlocks[currentIndex] || createNewBlock(active.id as BlockEnum);

    if (currentIndex >= 0) {
      updatedBlocks.splice(currentIndex, 1);
    }

    if (newIndex >= 0) {
      updatedBlocks.splice(newIndex, 0, block);
    } else {
      updatedBlocks.push(block);
    }

    setBlocks(updatedBlocks);
  }
}
