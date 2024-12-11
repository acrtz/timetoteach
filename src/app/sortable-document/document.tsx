"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import Draggable from "./draggable";

export default function Document(props) {
  const { items } = props;
  return (
    <main className="w-[calc(100vw-400px)] overflow-hidden block">
      <div className="w-[1000px] max-w-[90%] mx-auto mt-20">
        <div className="aspect-[1/1.414] rounded-xl border bg-card text-card-foreground shadow overflow-hidden pt-[8%] px-[12%]">
          {items.map((item, index) => (
            <div key={item.id} className="bg-gray-100 rounded">
              <Draggable
                id={item.id}
                key={item.id}
                metaData={{ type: "in-document", index }}
              >
                <Droppable
                  id={item.id}
                  key={item.id}
                  lastElement={item.type === "end"}
                  dropAbove={props.dropAbove}
                >
                  <div>hello {item.id}</div>
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
  // if (props.lastElement) {
  //   console.log({ isOver, isOverSelf, dropAbove: props.dropAbove });
  // }

  return (
    <div
      ref={setNodeRef}
      className={`${props.lastElement ? "h-full flex-grow " : ""}`}
      id={props.id}
    >
      <Placeholder visible={isOver && !isOverSelf && props.dropAbove} />
      <div className=" py-6">{props.children}</div>
      <Placeholder visible={isOver && !isOverSelf && !props.dropAbove} />
    </div>
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
