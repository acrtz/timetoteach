"use client";

import React from "react";
import Draggable from "./draggable";
import { Droppable, DroppableCatchAll } from "./droppable";
import { BlockType } from "@/types";
import Block from "./block";

export default function Document({
  blocks,
  dropAbove,
}: {
  blocks: BlockType[];
  dropAbove: boolean;
}) {
  return (
    <main className="w-[calc(100vw-350px)] h-screen overflow-y-scroll overflow-x-hidden">
      <div className="p-6 border bg-card rounded-xl w-[1000px] max-w-[90%] mx-auto my-12">
        <DroppableCatchAll>
          {blocks.map((block) => (
            <Draggable id={block.id as string} key={block.id}>
              <Droppable
                id={block.id as string}
                key={block.id}
                dropAbove={dropAbove}
              >
                <Block block={block} />
              </Droppable>
            </Draggable>
          ))}
        </DroppableCatchAll>
      </div>
    </main>
  );
}
