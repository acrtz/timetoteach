import { useMemo } from "react";
import { BlockEnum, BlockType, Align, ListVariant, GroupLayout } from "@/types";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";

const alignOptions = ["left", "center", "right"];
const listVariants = ["ordered", "unordered"];
const layoutOptions = ["vertical", "horizontal"];

export default function BlockSettings({
  block,
  onChange,
}: {
  block: BlockType;
  onChange: (updatedBlock: BlockType) => void;
}) {
  const settings = useMemo(() => {
    switch (block.type) {
      case BlockEnum.title:
      case BlockEnum.subtitle:
        return (
          <div className="space-y-4">
            <div>
              <Label>Text</Label>
              <Input
                value={block.value}
                onChange={(e) => onChange({ ...block, value: e.target.value })}
              />
            </div>
            <div>
              <Label>Alignment</Label>
              <Select
                value={block.align || "left"}
                onValueChange={(value: Align) =>
                  onChange({ ...block, align: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an alignment" />
                </SelectTrigger>
                <SelectContent>
                  {alignOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case BlockEnum.paragraph:
        return (
          <div>
            <Label>Content</Label>
            <Textarea
              value={block.value}
              onChange={(e) => onChange({ ...block, value: e.target.value })}
            />
          </div>
        );

      case BlockEnum.spacer:
        return (
          <div>
            <Label>Height (px)</Label>
            <Input
              type="number"
              value={block.height}
              onChange={(e) =>
                onChange({ ...block, height: Number(e.target.value) })
              }
              min={0}
            />
          </div>
        );

      case BlockEnum.text:
      case BlockEnum.textarea:
      case BlockEnum.number:
        return (
          <div className="space-y-4">
            <div>
              <Label>Label</Label>
              <Input
                value={block.label}
                onChange={(e) => onChange({ ...block, label: e.target.value })}
              />
            </div>
            <div>
              <Label>Placeholder</Label>
              <Input
                value={block.placeholder}
                onChange={(e) =>
                  onChange({ ...block, placeholder: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Helper Text</Label>
              <Input
                value={block.helperText}
                onChange={(e) =>
                  onChange({ ...block, helperText: e.target.value })
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={block.required}
                onCheckedChange={(checked) =>
                  onChange({ ...block, required: !!checked })
                }
              />
              <Label>Required</Label>
            </div>
            {block.type === BlockEnum.textarea && (
              <div>
                <Label>Rows</Label>
                <Input
                  type="number"
                  value={block.rows}
                  onChange={(e) =>
                    onChange({ ...block, rows: Number(e.target.value) })
                  }
                  min={1}
                />
              </div>
            )}
            {block.type === BlockEnum.number && (
              <>
                <div>
                  <Label>Minimum</Label>
                  <Input
                    type="number"
                    value={block.min || ""}
                    onChange={(e) =>
                      onChange({
                        ...block,
                        min: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Maximum</Label>
                  <Input
                    type="number"
                    value={block.max || ""}
                    onChange={(e) =>
                      onChange({
                        ...block,
                        max: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                  />
                </div>
              </>
            )}
          </div>
        );

      case BlockEnum.date:
        return (
          <div className="space-y-4">
            <div>
              <Label>Label</Label>
              <Input
                value={block.label}
                onChange={(e) => onChange({ ...block, label: e.target.value })}
              />
            </div>
            <div>
              <Label>Helper Text</Label>
              <Input
                value={block.helperText}
                onChange={(e) =>
                  onChange({ ...block, helperText: e.target.value })
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={block.required}
                onCheckedChange={(checked) =>
                  onChange({ ...block, required: !!checked })
                }
              />
              <Label>Required</Label>
            </div>
            <div>
              <Label>Minimum Date</Label>
              <Input
                type="date"
                value={block.min?.toISOString().split("T")[0] || ""}
                onChange={(e) =>
                  onChange({
                    ...block,
                    min: e.target.value ? new Date(e.target.value) : null,
                  })
                }
              />
            </div>
            <div>
              <Label>Maximum Date</Label>
              <Input
                type="date"
                value={block.max?.toISOString().split("T")[0] || ""}
                onChange={(e) =>
                  onChange({
                    ...block,
                    max: e.target.value ? new Date(e.target.value) : null,
                  })
                }
              />
            </div>
          </div>
        );

      case BlockEnum.list:
        return (
          <div className="space-y-4">
            <div>
              <Label>List Type</Label>
              <Select
                value={block.variant}
                onValueChange={(value: ListVariant) =>
                  onChange({ ...block, variant: value })
                }
              >
                <SelectContent>
                  {listVariants.map((variant) => (
                    <SelectItem key={variant} value={variant}>
                      {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Items (one per line)</Label>
              <Textarea
                value={block.items.join("\n")}
                onChange={(e) =>
                  onChange({ ...block, items: e.target.value.split("\n") })
                }
              />
            </div>
          </div>
        );

      case BlockEnum.checkbox:
        return (
          <div className="space-y-4">
            <div>
              <Label>Label</Label>
              <Input
                value={block.label}
                onChange={(e) => onChange({ ...block, label: e.target.value })}
              />
            </div>
            <div>
              <Label>Helper Text</Label>
              <Input
                value={block.helperText}
                onChange={(e) =>
                  onChange({ ...block, helperText: e.target.value })
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={block.required}
                onCheckedChange={(checked) =>
                  onChange({ ...block, required: !!checked })
                }
              />
              <Label>Required</Label>
            </div>
          </div>
        );

      case BlockEnum.checkboxgroup:
        return (
          <div className="space-y-4">
            <div>
              <Label>Label</Label>
              <Input
                value={block.label}
                onChange={(e) => onChange({ ...block, label: e.target.value })}
              />
            </div>
            <div>
              <Label>Helper Text</Label>
              <Input
                value={block.helperText}
                onChange={(e) =>
                  onChange({ ...block, helperText: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Options (one per line)</Label>
              <Textarea
                value={block.options.join("\n")}
                onChange={(e) =>
                  onChange({ ...block, options: e.target.value.split("\n") })
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={block.required}
                onCheckedChange={(checked) =>
                  onChange({ ...block, required: !!checked })
                }
              />
              <Label>Required</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={block.multiple}
                onCheckedChange={(checked) =>
                  onChange({ ...block, multiple: !!checked })
                }
              />
              <Label>Allow Multiple Selection</Label>
            </div>
            <div>
              <Label>Layout</Label>
              <Select
                value={block.layout}
                onValueChange={(value: GroupLayout) =>
                  onChange({ ...block, layout: value })
                }
              >
                <SelectContent>
                  {layoutOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case BlockEnum.separator:
        return (
          <div className="text-sm text-muted-foreground">
            No settings available
          </div>
        );
    }
  }, [block, onChange]);

  return (
    <div className="space-y-4 p-4">
      <div className="text-sm font-medium">Block Settings</div>
      {settings}
    </div>
  );
}
