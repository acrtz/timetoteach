import React from "react";
import SortableItem from "./sortable-item";

export default function Nav() {
  return (
    <div className="h-screen w-[400px] border-l bg-card p-8 flex flex-col gap-4">
      <SortableItem id="draggable-1">
        <div className="bg-red-500 h-20 w-20">hello</div>
      </SortableItem>
      <SortableItem id="draggable-2">
        <div className="bg-green-500 h-20 w-20">hello</div>
      </SortableItem>
      <SortableItem id="draggable-3">
        <div className="bg-purple-500 h-20 w-20">hello</div>
      </SortableItem>
      <SortableItem id="draggable-4">
        <div className="bg-orange-500 h-20 w-20">hello</div>
      </SortableItem>
    </div>
  );
}
