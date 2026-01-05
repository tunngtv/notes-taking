import React, { useRef } from "react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Tag } from "../../types/tag";

interface TagIntegratorProps {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

const TagIntegrator = ({ tags, setTags }: TagIntegratorProps) => {
  const input = useRef<HTMLInputElement>(null);
  const [selectedColor, setSelectedColor] = React.useState("");

  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "pink",
    "gray",
    "cyan",
  ];

  const addNewTag = (event: React.FormEvent) => {
    event.preventDefault();

    const tagTitle = input.current?.value;

    if (!tagTitle?.trim().length || !selectedColor) return;

    const newTag = {
      title: tagTitle,
      color: selectedColor,
      id: Date.now(),
    };

    setTags(currentTags => [...currentTags, newTag]);
    if (input.current) {
      input.current.value = "";
    }
    setSelectedColor("");
  };

  const removeTag = (selectedTagId: number) => {
    const newTags = tags.filter(tag => tag.id !== selectedTagId);
    setTags(newTags);
  };

  return (
    <div>
      <form className="flex gap-2" onSubmit={addNewTag}>
        <Input
          className="flex-1"
          required
          placeholder="Tag title"
          spellCheck={false}
          ref={input}
        />
        <Select value={selectedColor} onValueChange={setSelectedColor}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Color" />
          </SelectTrigger>
          <SelectContent>
            {colors.map((color, index) => (
              <SelectItem key={index} value={color}>
                <div className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: color }}
                  ></span>
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit" className="h-10">
          Add
        </Button>
      </form>
      <div className="mt-3">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map(({ title, color, id }) => (
              <Badge
                key={id}
                className="text-xs flex items-center gap-1 px-2 py-1"
                style={{ backgroundColor: color, color: "white" }}
              >
                {title}
                <button
                  onClick={() => removeTag(id)}
                  className="ml-1 text-white hover:text-gray-200 leading-none"
                  aria-label="Remove tag"
                >
                  &times;
                </button>
              </Badge>
            ))}
          </div>
        )}
        {tags.length === 0 && (
          <div className="text-muted-foreground text-sm italic pt-2">
            No tags added yet
          </div>
        )}
      </div>
    </div>
  );
};

export default TagIntegrator;
