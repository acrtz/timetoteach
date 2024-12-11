import { useDroppable } from "@dnd-kit/core";

export function Droppable(props) {
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
