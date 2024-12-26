import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import { Pencil, Trash } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { PopoverClose } from "@radix-ui/react-popover";

export function Droppable({
  id,
  className,
  dropAbove,
  children,
  deleteBlock,
  onEdit,
}: {
  id: string;
  className?: string;
  dropAbove: boolean;
  children: React.ReactNode;
  deleteBlock: (id: string) => void;
  onEdit: () => void;
}) {
  const { isOver, setNodeRef, ...rest } = useDroppable({ id });

  const isBeingDragged = isOver && rest.over?.id !== rest.active?.id;

  return (
    <>
      <Placeholder isVisible={isBeingDragged && dropAbove} />
      <div
        id={id}
        ref={setNodeRef}
        className={cn(
          "border rounded-lg p-4 bg-background my-2 relative overflow-hidden touch-none",
          className
        )}
      >
        {children}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-card opacity-0 hover:opacity-70 active:opacity-0 flex items-center justify-center gap-2">
          Drag to move
          <div
            className="absolute right-0 top-0 bottom-0 items-center gap-2"
            data-no-dnd="true"
          >
            <div
              className="h-1/2 bg-blue-500 hover:bg-blue-400 w-20 flex items-center justify-center"
              onClick={onEdit}
            >
              <Pencil className="w-6 h-6" />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <div className="h-1/2 bg-red-500 hover:bg-red-400 w-20 flex items-center justify-center">
                  <Trash className="w-6 h-6" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="bg-background">
                <div>Are you sure you want to delete this block?</div>
                <div className="flex items-center justify-between mt-6 gap-2">
                  <PopoverClose asChild>
                    <Button variant="secondary">Cancel</Button>
                  </PopoverClose>
                  <Button variant="destructive" onClick={() => deleteBlock(id)}>
                    Delete
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
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
