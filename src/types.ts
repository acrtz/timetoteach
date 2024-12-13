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
  math = "math",
};

export type ListVariant = "ordered" | "unordered";
export type GroupLayout = "vertical" | "horizontal";
export type Align = "left" | "center" | "right";

export interface BlockTemplate<T extends BlockEnum> {
  id?: string;
  type: T;
}

export interface TTitleBlock extends BlockTemplate<BlockEnum.title> {
  value: string;
  align?: Align;
}

export interface TMathBlock extends BlockTemplate<BlockEnum.math> {
  value: string;
  align?: Align;
}

export interface TSubtitleBlock extends BlockTemplate<BlockEnum.subtitle> {
  value: string;
  align?: Align;
}

export interface TParagraphBlock extends BlockTemplate<BlockEnum.paragraph> {
  value: string;
}

export interface TSpacerBlock extends BlockTemplate<BlockEnum.spacer> {
  height: number;
}

export type TSeparatorBlock = BlockTemplate<BlockEnum.separator>;

export interface TTextBlock extends BlockTemplate<BlockEnum.text> {
  label: string;
  placeholder: string;
  helperText: string;
  required: boolean;
}

export interface TTextareaBlock extends BlockTemplate<BlockEnum.textarea> {
  label: string;
  placeholder: string;
  helperText: string;
  required: boolean;
  rows: number;
}

export interface TNumberBlock extends BlockTemplate<BlockEnum.number> {
  label: string;
  placeholder: string;
  helperText: string;
  required: boolean;
  min: number | null;
  max: number | null;
}

export interface TDateBlock extends BlockTemplate<BlockEnum.date> {
  label: string;
  helperText: string;
  required: boolean;
  min: Date | null;
  max: Date | null;
}

export interface TListBlock extends BlockTemplate<BlockEnum.list> {
  items: string[];
  variant: ListVariant;
}

export interface TCheckboxBlock extends BlockTemplate<BlockEnum.checkbox> {
  label: string;
  helperText: string;
  required: boolean;
}

export interface TCheckboxGroupBlock extends BlockTemplate<BlockEnum.checkboxgroup> {
  label: string;
  helperText: string;
  required: boolean;
  options: string[];
  multiple: boolean;
  layout: GroupLayout;
}

export type BlockType = TTitleBlock | TSubtitleBlock | TParagraphBlock | TSpacerBlock | TSeparatorBlock | TTextBlock | TTextareaBlock | TNumberBlock | TDateBlock | TListBlock | TCheckboxBlock | TCheckboxGroupBlock | TMathBlock;