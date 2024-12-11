import React from "react";
import Draggable from "./draggable";

export default function Nav() {
  return (
    <div className="h-screen w-[400px] border-l bg-card p-8 flex flex-col gap-4">
      <Draggable metaData={{ type: "in-nav" }} id="draggable-1">
        <div className="bg-red-500 h-20 w-20">hello</div>
      </Draggable>
      <Draggable metaData={{ type: "in-nav" }} id="draggable-2">
        <div className="bg-green-500 h-20 w-20">hello</div>
      </Draggable>
      <Draggable metaData={{ type: "in-nav" }} id="draggable-3">
        <div className="bg-purple-500 h-20 w-20">hello</div>
      </Draggable>
      <Draggable metaData={{ type: "in-nav" }} id="draggable-4">
        <div className="bg-orange-500 h-20 w-20">hello</div>
      </Draggable>
    </div>
  );
}
