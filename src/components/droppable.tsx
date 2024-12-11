import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";

export function Droppable({
  id,
  className,
  dropAbove,
  children,
}: {
  id: string;
  className?: string;
  dropAbove: boolean;
  children: React.ReactNode;
}) {
  const { isOver, setNodeRef, ...rest } = useDroppable({ id });

  const isBeingDragged = isOver && rest.over?.id !== rest.active?.id;

  return (
    <>
      <Placeholder isVisible={isBeingDragged && dropAbove} />
      <div
        id={id}
        ref={setNodeRef}
        className={cn("border rounded-lg p-4 bg-background my-2", className)}
      >
        {children}
      </div>
      <Placeholder isVisible={isBeingDragged && !dropAbove} />
    </>
  );
}

export function DroppableCatchAll({ children }: { children: React.ReactNode }) {
  const id = "catch-all";
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      id={id}
      ref={setNodeRef}
      className="w-full min-h-[90vh] overflow-hidden flex-grow pb-32"
    >
      {children}
      <Placeholder isVisible={isOver} />
    </div>
  );
}

const Placeholder = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <div
      className={`${
        isVisible ? "h-8" : "h-0"
      }  rounded-full w-full transition-all duration-100 overflow-hidden flex items-center justify-center`}
    >
      <div className="h-0.5 flex-1 bg-gradient-to-l from-muted-foreground/20" />
      <div className="w-40 text-center text-muted-foreground/50 text-sm">
        Insert Here
      </div>
      <div className="h-0.5 flex-1 bg-gradient-to-r from-muted-foreground/20" />
    </div>
  );
};
