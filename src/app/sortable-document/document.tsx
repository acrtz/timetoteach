"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import Draggable from "./draggable";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Block = ({ title, children }: { title: string; children: any }) => {
  return (
    <div>
      <div className="text-sm text-muted-foreground mb-2">{title}</div>
      {children}
    </div>
  );
};

const renderElement = (element) => {
  switch (element.type) {
    case "title":
      return (
        <Block title="Title">
          <h1 className="text-2xl font-bold">{element.value}</h1>
        </Block>
      );
    case "subtitle":
      return (
        <Block title="Subtitle">
          <h2 className="text-xl font-semibold">{element.value}</h2>
        </Block>
      );
    case "paragraph":
      return (
        <Block title="Paragraph">
          <p className="text-base">{element.value}</p>
        </Block>
      );
    case "spacer":
      return (
        <Block title="Spacer">
          <div className=" text-muted-foreground text-center">
            Height: {element.height}px
          </div>
        </Block>
      );
    case "separator":
      return (
        <Block title="Separator">
          <hr />
        </Block>
      );
    case "list":
      return (
        <Block title="List">
          <ul
            className={`${
              element.variant === "ordered" ? "list-decimal" : "list-disc"
            } pl-5`}
          >
            {element.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Block>
      );
    case "text":
      return (
        <Block title="Text Input">
          <Label>{element.label}</Label>
          <Input placeholder={element.placeholder} />
        </Block>
      );
    case "textarea":
      return (
        <Block title="Textarea Input">
          <Label>{element.label}</Label>
          <Textarea placeholder={element.placeholder} />
        </Block>
      );
    case "number":
      return (
        <Block title="Number Input">
          <Label>{element.label}</Label>
          <Input type="number" />
        </Block>
      );
    case "date":
      return (
        <Block title="Date Input">
          <Label>{element.label}</Label>
          <Input type="date" />
        </Block>
      );
    case "checkbox":
      return (
        <Block title="Checkbox">
          <div className="flex items-center gap-2">
            <Checkbox />
            <Label>{element.label}</Label>
          </div>
        </Block>
      );
    case "checkboxgroup":
      return (
        <Block title="Checkbox Group">
          <div className="flex flex-col gap-2">
            <Label>{element.label}</Label>
            {element.options.map((option) => (
              <div key={option} className="flex items-center gap-2 py-1">
                <Checkbox />
                <Label>{option}</Label>
              </div>
            ))}
          </div>
        </Block>
      );
  }
};

export default function Document(props) {
  const { items } = props;
  return (
    <main className="w-[calc(100vw-350px)] overflow-hidden block">
      <div className="w-[1000px] max-w-[90%] mx-auto mt-20">
        {/* <div className="aspect-[1/1.414] rounded-xl border bg-card text-card-foreground shadow overflow-hidden pt-[8%] px-[12%]"> */}
        <div className="aspect-[1/1.414] rounded-xl border bg-card text-card-foreground shadow overflow-hidden p-6">
          {items.map((item) => (
            <div key={item.id} className="bg-border rounded">
              <Draggable id={item.id} key={item.id}>
                <Droppable
                  id={item.id}
                  key={item.id}
                  lastElement={item.type === "end"}
                  dropAbove={props.dropAbove}
                >
                  {renderElement(item)}
                </Droppable>
              </Draggable>
            </div>
          ))}
          {/* END */}
          <Droppable id={"end"} lastElement={true} dropAbove={true}>
            <div />
          </Droppable>
        </div>
      </div>
    </main>
  );
}

function Droppable(props) {
  const { isOver, setNodeRef, ...rest } = useDroppable({
    id: props.id,
  });

  const isOverSelf = rest.over?.id === rest.active?.id;

  return (
    <>
      <Placeholder visible={isOver && !isOverSelf && props.dropAbove} />
      <div
        ref={setNodeRef}
        className={`${
          props.lastElement
            ? "h-full flex-grow"
            : "border rounded-lg p-4 bg-gray-100 my-2"
        } `}
        id={props.id}
      >
        {props.children}
      </div>
      <Placeholder visible={isOver && !isOverSelf && !props.dropAbove} />
    </>
  );
}

const Placeholder = ({ visible }) => {
  return (
    <div
      className={`${
        visible ? "h-8" : "h-0"
      }  rounded-full w-full transition-all duration-100 overflow-hidden flex items-center justify-center`}
    >
      <div className="h-0.5 flex-1 bg-gradient-to-l from-gray-200" />
      <div className="w-40 text-center text-gray-300 text-sm">Insert Here</div>
      <div className="h-0.5 flex-1 bg-gradient-to-r from-gray-200" />
    </div>
  );
};
