import {BlockEnum, BlockType} from "@/types";
import { v4 as uuidv4 } from "uuid";



export function createNewBlock(type: BlockEnum) {
  const block = {
    ...defaultBlockValues[type],
    id: uuidv4(),
  };

  return block;
}


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
  math: {
    type: BlockEnum.math,
    value: "\\pm\\sqrt{a^2 + b^2}",
    align: "center",
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
