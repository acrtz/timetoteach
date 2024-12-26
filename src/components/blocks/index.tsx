import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BlockEnum, BlockType } from "@/types";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { MathBlock } from "./math-block";

const BlockWrapper = ({
  title,
  children,
}: {
  title: string;
  children: any;
}) => {
  return (
    <div>
      <div className="text-sm text-muted-foreground mb-2">{title}</div>
      {children}
    </div>
  );
};

export default function Block({ block }: { block: BlockType }) {
  switch (block.type) {
    case BlockEnum.title:
      return (
        <BlockWrapper title="Title">
          <h1 className="text-2xl font-bold">{block.value}</h1>
        </BlockWrapper>
      );
    case BlockEnum.subtitle:
      return (
        <BlockWrapper title="Subtitle">
          <h2 className="text-xl font-semibold">{block.value}</h2>
        </BlockWrapper>
      );
    case BlockEnum.paragraph:
      return (
        <BlockWrapper title="Paragraph">
          <p className="text-base">{block.value}</p>
        </BlockWrapper>
      );
    case BlockEnum.spacer:
      return (
        <BlockWrapper title="Spacer">
          <div className="text-muted-foreground text-center py-2">
            Height: {block.height}px
          </div>
        </BlockWrapper>
      );
    case BlockEnum.separator:
      return (
        <BlockWrapper title="Separator">
          <div className="py-6 w-full">
            <hr />
          </div>
        </BlockWrapper>
      );
    case BlockEnum.list:
      return (
        <BlockWrapper title="List">
          <ul
            className={`${
              block.variant === "ordered" ? "list-decimal" : "list-disc"
            } pl-5`}
          >
            {block.items?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </BlockWrapper>
      );
    case BlockEnum.text:
      return (
        <BlockWrapper title="Text Input">
          <Label>{block.label}</Label>
          <Input placeholder={block.placeholder} />
        </BlockWrapper>
      );
    case BlockEnum.textarea:
      return (
        <BlockWrapper title="Textarea Input">
          <Label>{block.label}</Label>
          <Textarea placeholder={block.placeholder} />
        </BlockWrapper>
      );
    case BlockEnum.number:
      return (
        <BlockWrapper title="Number Input">
          <Label>{block.label}</Label>
          <Input type="number" />
        </BlockWrapper>
      );
    case BlockEnum.date:
      return (
        <BlockWrapper title="Date Input">
          <Label>{block.label}</Label>
          <Input type="date" />
        </BlockWrapper>
      );
    case BlockEnum.checkbox:
      return (
        <BlockWrapper title="Checkbox">
          <div className="flex items-center gap-2">
            <Checkbox />
            <Label>{block.label}</Label>
          </div>
        </BlockWrapper>
      );
    case BlockEnum.checkboxgroup:
      return (
        <BlockWrapper title="Checkbox Group">
          <div className="flex flex-col gap-2">
            <Label>{block.label}</Label>
            {block.options?.map((option) => (
              <div key={option} className="flex items-center gap-2 py-1">
                <Checkbox />
                <Label>{option}</Label>
              </div>
            ))}
          </div>
        </BlockWrapper>
      );
    case BlockEnum.math:
      return (
        <BlockWrapper title="Math">
          <MathBlock block={block} />
        </BlockWrapper>
      );
    default:
      return null;
  }
}
