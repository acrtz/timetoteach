"use client";

import React from "react";
import Draggable from "./draggable";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Droppable } from "./droppable";
import { BlockEnum, BlockType } from "@/lib/blocks";

export default function Document({
  blocks,
  dropAbove,
}: {
  blocks: BlockType[];
  dropAbove: boolean;
}) {
  return (
    <main className="w-[calc(100vw-350px)] overflow-hidden block">
      <div className="w-[1000px] max-w-[90%] mx-auto mt-20">
        <div className="aspect-[1/1.414] rounded-xl border bg-card text-card-foreground shadow overflow-hidden p-6">
          {blocks.map((block) => (
            <div key={block.id} className="bg-border rounded">
              <Draggable id={block.id} key={block.id}>
                <Droppable id={block.id} key={block.id} dropAbove={dropAbove}>
                  {renderBlock(block)}
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

const Block = ({ title, children }: { title: string; children: any }) => {
  return (
    <div>
      <div className="text-sm text-muted-foreground mb-2">{title}</div>
      {children}
    </div>
  );
};

const renderBlock = (block: BlockType) => {
  switch (block.type) {
    case BlockEnum.title:
      return (
        <Block title="Title">
          <h1 className="text-2xl font-bold">{block.value}</h1>
        </Block>
      );
    case BlockEnum.subtitle:
      return (
        <Block title="Subtitle">
          <h2 className="text-xl font-semibold">{block.value}</h2>
        </Block>
      );
    case BlockEnum.paragraph:
      return (
        <Block title="Paragraph">
          <p className="text-base">{block.value}</p>
        </Block>
      );
    case BlockEnum.spacer:
      return (
        <Block title="Spacer">
          <div className=" text-muted-foreground text-center">
            Height: {block.height}px
          </div>
        </Block>
      );
    case BlockEnum.separator:
      return (
        <Block title="Separator">
          <hr />
        </Block>
      );
    case BlockEnum.list:
      return (
        <Block title="List">
          <ul
            className={`${
              block.variant === "ordered" ? "list-decimal" : "list-disc"
            } pl-5`}
          >
            {block.items?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Block>
      );
    case BlockEnum.text:
      return (
        <Block title="Text Input">
          <Label>{block.label}</Label>
          <Input placeholder={block.placeholder} />
        </Block>
      );
    case BlockEnum.textarea:
      return (
        <Block title="Textarea Input">
          <Label>{block.label}</Label>
          <Textarea placeholder={block.placeholder} />
        </Block>
      );
    case BlockEnum.number:
      return (
        <Block title="Number Input">
          <Label>{block.label}</Label>
          <Input type="number" />
        </Block>
      );
    case BlockEnum.date:
      return (
        <Block title="Date Input">
          <Label>{block.label}</Label>
          <Input type="date" />
        </Block>
      );
    case BlockEnum.checkbox:
      return (
        <Block title="Checkbox">
          <div className="flex items-center gap-2">
            <Checkbox />
            <Label>{block.label}</Label>
          </div>
        </Block>
      );
    case BlockEnum.checkboxgroup:
      return (
        <Block title="Checkbox Group">
          <div className="flex flex-col gap-2">
            <Label>{block.label}</Label>
            {block.options?.map((option) => (
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
