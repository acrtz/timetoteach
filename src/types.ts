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

type ListVariant = "ordered" | "unordered";
type GroupLayout = "vertical" | "horizontal"
type Align = "left" | "center" | "right"

export interface BT<T extends BlockEnum> {
  id?: string;
  type: T;
}

export interface TitleBlock extends BT<BlockEnum.title> {
  value: string;
  align?: Align;
}

export interface SubtitleBlock extends BT<BlockEnum.subtitle> {
  value: string;
  align?: Align;
}

export interface ParagraphBlock extends BT<BlockEnum.paragraph> {
  value: string;
}

export interface SpacerBlock extends BT<BlockEnum.spacer> {
  height: number;
}

export type SeparatorBlock = BT<BlockEnum.separator>;

export interface TextBlock extends BT<BlockEnum.text> {
  label: string;
  placeholder: string;
  helperText: string;
  required: boolean;
}

export interface TextareaBlock extends BT<BlockEnum.textarea> {
  label: string;
  placeholder: string;
  helperText: string;
  required: boolean;
  rows: number;
}

export interface NumberBlock extends BT<BlockEnum.number> {
  label: string;
  placeholder: string;
  helperText: string;
  required: boolean;
  min: number | null;
  max: number | null;
}

export interface DateBlock extends BT<BlockEnum.date> {
  label: string;
  helperText: string;
  required: boolean;
  min: Date | null;
  max: Date | null;
}

export interface ListBlock extends BT<BlockEnum.list> {
  items: string[];
  variant: ListVariant;
}

export interface CheckboxBlock extends BT<BlockEnum.checkbox> {
  label: string;
  helperText: string;
  required: boolean;
}

export interface CheckboxGroupBlock extends BT<BlockEnum.checkboxgroup> {
  label: string;
  helperText: string;
  required: boolean;
  options: string[];
  multiple: boolean;
  layout: GroupLayout;
}

export type BlockType = TitleBlock | SubtitleBlock | ParagraphBlock | SpacerBlock | SeparatorBlock | TextBlock | TextareaBlock | NumberBlock | DateBlock | ListBlock | CheckboxBlock | CheckboxGroupBlock;