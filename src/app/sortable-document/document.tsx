"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";

export default function Document(props) {
  const { items } = props;

  return (
    <main className="w-[calc(100vw-400px)] overflow-hidden block">
      <div className="w-[1000px] max-w-[90%] mx-auto mt-20">
        <div className="aspect-[1/1.414] rounded-xl border bg-card text-card-foreground shadow overflow-hidden pt-[8%] px-[12%]">
          {items.map((item) => (
            <Droppable
              id={item.id}
              key={item.id}
              lastElement={item.type === "end"}
            >
              {item.type === "end" ? (
                <div className="h-full bg-yellow-500 w-full flex-grow">end</div>
              ) : (
                <div>hello {item.id}</div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </main>
  );
}

function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${props.lastElement ? "flex-grow" : ""} `}
    >
      <div
        className={`${
          isOver ? "h-16" : "h-0"
        } bg-yellow-100 rounded-full w-full transition-all duration-100 overflow-hidden flex items-center`}
      >
        <div className="h-0.5 bg-gray-200 w-full" />
      </div>
      <div className="border py-6">{props.children}</div>
    </div>
  );
}
