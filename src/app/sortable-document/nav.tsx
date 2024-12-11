import React from "react";
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
  SquareCheck,
  Text,
  TextSelect,
  Type,
} from "lucide-react";

const groups = [
  {
    group: "Structure",
    elements: [
      {
        id: "title",
        label: "Title",
        icon: Heading1,
      },
      {
        id: "subtitle",
        label: "Sub-title",
        icon: Heading2,
      },
      {
        id: "paragraph",
        label: "Paragraph",
        icon: Text,
      },
      {
        id: "list",
        label: "List",
        icon: List,
      },
      {
        id: "spacer",
        label: "Spacer",
        icon: BetweenHorizonalStart,
      },
      {
        id: "separator",
        label: "Separator",
        icon: SeparatorHorizontal,
      },
    ],
  },
  {
    group: "Inputs",
    elements: [
      {
        id: "text",
        label: "Text",
        icon: Type,
      },
      {
        id: "textarea",
        label: "Text Area",
        icon: TextSelect,
      },
      {
        id: "number",
        label: "Number",
        icon: FileDigit,
      },
      {
        id: "date",
        label: "Date",
        icon: CalendarDays,
      },
      {
        id: "checkbox",
        label: "Checkbox",
        icon: SquareCheck,
      },
      {
        id: "checkboxgroup",
        label: "Checkbox Group",
        icon: ListTodo,
      },
    ],
  },
];

export default function Nav() {
  return (
    <div className="h-screen w-[350px] border-l bg-card p-8 flex flex-col gap-4">
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
              className="col-span-1 flex flex-col justify-center items-center border rounded-lg p-4 gap-2 text-center"
            >
              <element.icon className="text-muted-foreground" />
              <div className="text-sm text-muted-foreground">
                {element.label}
              </div>
            </Draggable>
          ))}
        </div>
      ))}
    </div>
  );
}
