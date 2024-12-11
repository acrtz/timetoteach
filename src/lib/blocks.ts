import { v4 as uuidv4 } from "uuid";

export enum BlockEnum {
  title = "title",
  subtitle = "subtitle",
  paragraph = "paragraph",
  spacer = "spacer",
  separator = "separator",
  text = "text",
  textarea = "textarea",
  number = "number",
  date = "date",
  list = "list",
  checkbox = "checkbox",
  checkboxgroup = "checkboxgroup",
};

export function createNewBlock(type: BlockEnum) {
  const block = {
    ...defaultBlockValues[type],
    id: uuidv4(),
  };

  return block;
}

export interface TitleBlock {
  id?: string;
  type: BlockEnum.title;
  value: string;
  align?: "left" | "center" | "right";
}

export interface SubtitleBlock {
  id?: string;
  type: BlockEnum.subtitle;
  value: string;
  align?: "left" | "center" | "right";
}

export interface ParagraphBlock {
  id?: string;
  type: BlockEnum.paragraph;
  value: string;
}

export interface SpacerBlock {
  id?: string;
  type: BlockEnum.spacer;
  height: number;
}

export interface SeparatorBlock {
  id?: string;
  type: BlockEnum.separator;
}

export interface TextBlock {
  id?: string;
  type: BlockEnum.text;
  label: string;
  placeholder: string;
  helperText: string;
  required: boolean;
}

export interface TextareaBlock {
  id?: string;
  type: BlockEnum.textarea;
  label: string;
  placeholder: string;
  helperText: string;
  required: boolean;
  rows: number;
}

export interface NumberBlock {
  id?: string;
  type: BlockEnum.number;
  label: string;
  placeholder: string;
  helperText: string;
  required: boolean;
  min: number | null;
  max: number | null;
}

export interface DateBlock {
  id?: string;
  type: BlockEnum.date;
  label: string;
  helperText: string;
  required: boolean;
  min: Date | null;
  max: Date | null;
}

export interface ListBlock {
  id?: string;
  type: BlockEnum.list;
  items: string[];
  variant: "ordered" | "unordered";
}

export interface CheckboxBlock {
  id?: string;
  type: BlockEnum.checkbox;
  label: string;
  helperText: string;
  required: boolean;
}

export interface CheckboxGroupBlock {
  id?: string;
  type: BlockEnum.checkboxgroup;
  label: string;
  helperText: string;
  required: boolean;
  options: string[];
  multiple: boolean;
  layout: "vertical" | "horizontal";
}

export type BlockType = TitleBlock | SubtitleBlock | ParagraphBlock | SpacerBlock | SeparatorBlock | TextBlock | TextareaBlock | NumberBlock | DateBlock | ListBlock | CheckboxBlock | CheckboxGroupBlock;

export const defaultBlockValues: Record<BlockEnum, BlockType> = {
  title: {
    type: BlockEnum.title,
    value: "Title",
    align: "left",
  },
  subtitle: {
    type: BlockEnum.subtitle,
    value: "Subtitle",
    align: "left",
  },
  paragraph: {
    type: BlockEnum.paragraph,
    value:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
  },
  spacer: {
    type: BlockEnum.spacer,
    height: 12,
  },
  separator: {
    type: BlockEnum.separator,
  },
  text: {
    type: BlockEnum.text,
    label: "Input label",
    placeholder: "Input placeholder",
    helperText: "Input helper text",
    required: false,
  },
  textarea: {
    type: BlockEnum.textarea,
    label: "Textarea label",
    placeholder: "Textarea placeholder",
    helperText: "Textarea helper text",
    required: false,
    rows: 4,
  },
  number: {
    type: BlockEnum.number,
    label: "Number label",
    placeholder: "Number placeholder",
    helperText: "Number helper text",
    required: false,
    min: null,
    max: null,
  },
  date: {
    type: BlockEnum.date,
    label: "Date label",
    helperText: "Date helper text",
    required: false,
    min: null,
    max: null,
  },
  list: {
    type: BlockEnum.list,
    items: ["Item 1", "Item 2", "Item 3"],
    variant: "unordered",
  },
  checkbox: {
    type: BlockEnum.checkbox,
    label: "Checkbox label",
    helperText: "Checkbox helper text",
    required: false,
  },
  checkboxgroup: {
    type: BlockEnum.checkboxgroup,
    label: "Checkbox group label",
    helperText: "Checkbox group helper text",
    required: false,
    options: ["Option 1", "Option 2", "Option 3"],
    multiple: false,
    layout: "vertical",
  },
};
