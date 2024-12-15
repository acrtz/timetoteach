import React from "react";
import Draggable from "./draggable";
import { Droppable, DroppableCatchAll } from "./droppable";
import { BlockType } from "@/types";
import Block from "./block";

export default function Document({
  blocks,
  dropAbove,
  deleteBlock,
  setSelectedBlock,
}: {
  blocks: BlockType[];
  dropAbove: boolean;
  deleteBlock: (id: string) => void;
  setSelectedBlock: (block: BlockType) => void;
}) {
  return (
    <div
      className="p-6 border bg-card rounded-xl w-[1000px] max-w-[90%] mx-auto my-12"
      id="pageprint"
    >
      <DroppableCatchAll>
        {blocks.map((block) => (
          <Draggable id={block.id as string} key={block.id}>
            <Droppable
              id={block.id as string}
              key={block.id}
              dropAbove={dropAbove}
              deleteBlock={deleteBlock}
              onEdit={() => setSelectedBlock(block)}
            >
              <Block block={block} />
            </Droppable>
          </Draggable>
        ))}
      </DroppableCatchAll>
    </div>
  );
}
