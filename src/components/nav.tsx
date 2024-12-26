import React, { useMemo } from "react";
import Draggable from "./draggable";
import {
  BetweenHorizonalStart,
  CalendarDays,
  FileDigit,
  Heading1,
  Heading2,
  List,
  ListTodo,
  SeparatorHorizontal,
  Sigma,
  SquareCheck,
  Text,
  TextSelect,
  Type,
} from "lucide-react";
import { BlockEnum, BlockType } from "@/types";
import BlockSettings from "./block-settings";

export default function Nav({
  selectedBlock,
  setSelectedBlock,
  setView,
  view,
}: {
  selectedBlock: BlockType | null;
  setSelectedBlock: (block: BlockType | null) => void;
  view: "editor" | "pdf";
  setView: (view: "editor" | "pdf") => void;
}) {
  return (
    <div
      className="h-screen w-[350px] border-l bg-card p-8 flex flex-col gap-4 block-nav overflow-y-scroll"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      {selectedBlock ? (
        <BlockSettings
          block={selectedBlock}
          onClose={() => setSelectedBlock(null)}
        />
      ) : (
        <>
          <div className="p-2 border-border shadow flex mx-auto bg-background rounded-full gap-2">
            <div
              className="w-32 h-10 flex items-center justify-center bg-card border rounded-full"
              onClick={() => setView("editor")}
            >
              Edit
            </div>
            <div
              className="w-32 h-10 flex items-center justify-center bg-card border rounded-full"
              onClick={() => setView("pdf")}
            >
              Preview
            </div>
          </div>
          <div className="text-sm">Draggable Building Blocks</div>
          {groups.map((group) => (
            <div key={group.group} className="grid grid-cols-2 gap-4">
              <h2 className="text-muted-foreground text-sm col-span-2">
                {group.group}
              </h2>
              {group.elements.map((element) => (
                <Draggable
                  id={element.id}
                  key={element.id}
                  className="flex flex-col justify-center items-center border rounded-lg p-4 gap-2 text-center"
                >
                  <element.icon className="text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">
                    {element.label}
                  </div>
                </Draggable>
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

const groups = [
  {
    group: "Structure",
    elements: [
      {
        id: BlockEnum.title,
        label: "Title",
        icon: Heading1,
      },
      {
        id: BlockEnum.subtitle,
        label: "Sub-title",
        icon: Heading2,
      },
      {
        id: BlockEnum.paragraph,
        label: "Paragraph",
        icon: Text,
      },
      {
        id: BlockEnum.list,
        label: "List",
        icon: List,
      },
      {
        id: BlockEnum.spacer,
        label: "Spacer",
        icon: BetweenHorizonalStart,
      },
      {
        id: BlockEnum.separator,
        label: "Separator",
        icon: SeparatorHorizontal,
      },
      {
        id: BlockEnum.math,
        label: "Math",
        icon: Sigma,
      },
    ],
  },
  {
    group: "Inputs",
    elements: [
      {
        id: BlockEnum.text,
        label: "Text",
        icon: Type,
      },
      {
        id: BlockEnum.textarea,
        label: "Text Area",
        icon: TextSelect,
      },
      {
        id: BlockEnum.number,
        label: "Number",
        icon: FileDigit,
      },
      {
        id: BlockEnum.date,
        label: "Date",
        icon: CalendarDays,
      },
      {
        id: BlockEnum.checkbox,
        label: "Checkbox",
        icon: SquareCheck,
      },
      {
        id: BlockEnum.checkboxgroup,
        label: "Checkbox Group",
        icon: ListTodo,
      },
    ],
  },
];
