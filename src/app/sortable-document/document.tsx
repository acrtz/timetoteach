import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "./sortable-item";

export default function Document(props) {
  const { id, items } = props;

  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <main className="w-[calc(100vw-400px)] overflow-hidden  block">
      <div className="w-[1000px] max-w-[90%] mx-auto mt-20">
        <div className="aspect-[1/1.414] rounded-xl border bg-card text-card-foreground shadow  overflow-hidden pt-[8%] px-[12%]">
          <SortableContext
            id={id}
            items={items}
            strategy={verticalListSortingStrategy}
          >
            <div ref={setNodeRef} className=" h-full w-full">
              {items.map((id) => (
                <SortableItem key={id} id={id} />
              ))}
            </div>
          </SortableContext>
        </div>
      </div>
    </main>
  );
}
