import { useMemo } from "react";
import { BlockEnum, BlockType } from "@/types";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";

export default function BlockSettings({ block }: { block: BlockType }) {
  const settings = useMemo(() => {
    {
      switch (block.type) {
        case BlockEnum.title:
          return (
            <div>
              <div>Title</div>
              <Label>Value</Label>
              <Input value={block.value} onChange={(e) => {}} />
            </div>
          );
        case BlockEnum.subtitle:
          return <div>Subtitle</div>;
        case BlockEnum.paragraph:
          return <div>Paragraph</div>;
        case BlockEnum.spacer:
          return <div>Spacer</div>;
        case BlockEnum.separator:
          return <div>Separator</div>;
      }
    }
  }, [block?.id]);
  return (
    <div>
      <div className="text-sm">Block Settings</div>
      {settings}
    </div>
  );
}
