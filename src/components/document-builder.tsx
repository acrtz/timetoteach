"use client";

import React, { useCallback, useEffect, useState } from "react";
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
import PdfView from "./pdf";
import { Button } from "./ui/button";

export default function DocumentBuilder() {
  const [blocks, setBlocks] = useState<BlockType[]>([
    {
      type: "title",
      value: "AP Chemistry Assignment: Atomic Theory and Structure of Atoms",
      align: "center",
    },
    { type: "spacer", height: 20 },
    {
      type: "subtitle",
      value: "Section 1: Atomic Theory Overview",
      align: "left",
    },
    {
      type: "paragraph",
      value:
        "Atomic theory explains the nature of matter by stating that matter is composed of discrete units called atoms. This section will introduce you to the structure of atoms, electron configurations, periodic trends, and Coulomb’s law.",
    },
    { type: "spacer", height: 20 },
    { type: "subtitle", value: "Section 2: Structure of Atoms", align: "left" },
    {
      type: "paragraph",
      value:
        "Atoms consist of protons, neutrons, and electrons. The nucleus contains protons and neutrons, while electrons orbit around the nucleus in electron clouds.",
    },
    { type: "math", value: "Z = N + P", align: "center" },
    {
      type: "paragraph",
      value:
        "Where Z is the atomic number, N is the number of neutrons, and P is the number of protons.",
    },
    { type: "spacer", height: 20 },
    {
      type: "subtitle",
      value: "Section 3: Electron Configurations",
      align: "left",
    },
    {
      type: "paragraph",
      value:
        "Electron configurations describe the arrangement of electrons in an atom. Understanding these configurations is essential for predicting chemical behavior.",
    },
    {
      type: "text",
      label: "Write the electron configuration for Oxygen (O)",
      placeholder: "Enter your answer",
      helperText: "Use the format: 1s² 2s² 2p⁴",
      required: true,
    },
    { type: "spacer", height: 20 },
    { type: "subtitle", value: "Section 4: Periodic Trends", align: "left" },
    {
      type: "paragraph",
      value:
        "Periodic trends refer to patterns in the properties of elements across the periodic table. Important trends include atomic radius, electronegativity, and ionization energy.",
    },
    {
      type: "list",
      items: ["Atomic Radius", "Electronegativity", "Ionization Energy"],
      variant: "unordered",
    },
    { type: "spacer", height: 20 },
    { type: "subtitle", value: "Section 5: Coulomb’s Law", align: "left" },
    {
      type: "paragraph",
      value:
        "Coulomb’s Law describes the force between two charged particles. It states that the force is proportional to the product of the charges and inversely proportional to the square of the distance between them.",
    },
    { type: "math", value: "\\pm\\sqrt{a^2 + b^2}", align: "center" },
    {
      type: "paragraph",
      value:
        "Where F is the force between the charges, k is Coulomb's constant, q1 and q2 are the amounts of the charges, and r is the distance between them.",
    },
    { type: "spacer", height: 20 },
    {
      type: "subtitle",
      value: "Section 6: Reflection Questions",
      align: "left",
    },
    {
      type: "textarea",
      label: "Discuss how periodic trends affect chemical reactivity.",
      placeholder: "Type your explanation here",
      helperText: "Provide a clear and concise explanation.",
      required: true,
      rows: 3,
    },
    {
      type: "checkbox",
      label: "I have completed all sections of this assignment.",
      helperText: "Check if complete.",
      required: true,
    },
  ]);
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

  const unselectBlock = useCallback((event: MouseEvent) => {
    const navElement = document.querySelector(".block-nav"); // Use your actual class or ref
    if (navElement && navElement.contains(event.target as Node)) {
      return;
    }
    setSelectedBlock(null);
  }, []);

  useEffect(() => {
    if (selectedBlock) {
      document.addEventListener("click", unselectBlock);
    } else {
      document.removeEventListener("click", unselectBlock);
    }
    return () => {
      document.removeEventListener("click", unselectBlock);
    };
  }, [selectedBlock]);

  const [view, setView] = useState<"editor" | "pdf">("editor");

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
      <div className="w-screen flex">
        {view === "editor" ? (
          <>
            <div className="flex flex-col">
              <div className="flex justify-center">
                <Button onClick={() => setView("editor")}>Editor</Button>
                <Button onClick={() => setView("pdf")}>PDF</Button>
              </div>

              <Document
                blocks={blocks}
                dropAbove={dropAbove}
                deleteBlock={deleteBlock}
                setSelectedBlock={setSelectedBlock}
              />
            </div>
            <Nav
              selectedBlock={selectedBlock}
              setSelectedBlock={setSelectedBlock}
            />
          </>
        ) : (
          <div className="flex flex-col w-[calc(100vw-350px)]">
            <PdfView schema={blocks} />
            <Button onClick={() => setView("editor")}>Editor</Button>
          </div>
        )}
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
