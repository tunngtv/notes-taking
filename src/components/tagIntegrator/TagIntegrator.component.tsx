import React, { useRef } from "react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { Tag } from "../../types/tag";

interface TagIntegratorProps {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

const TagIntegrator = ({ tags, setTags }: TagIntegratorProps) => {
  const input = useRef<HTMLInputElement>(null);
  const selector = useRef<HTMLSelectElement>(null);

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
    const tagColor = selector.current?.value;

    if (!tagTitle?.trim().length || !tagColor) return;

    const newTag = {
      title: tagTitle,
      color: tagColor,
      id: Date.now(),
    };

    setTags(currentTags => [...currentTags, newTag]);
    if (input.current) {
      input.current.value = "";
    }
  };

  const removeTag = (selectedTagId: number) => {
    const newTags = tags.filter(tag => tag.id !== selectedTagId);
    setTags(newTags);
  };

  return (
    <div>
      <form className="flex" onSubmit={addNewTag}>
        <Input
          className="rounded-r-none border-r-0"
          required
          placeholder="Tag title"
          spellCheck={false}
          ref={input}
        />
        <select
          className="rounded-none border-l-0 border-r-0 flex-[0.4]"
          ref={selector}
          required
        >
          <option value="">Color</option>
          {colors.map((color, index) => (
            <option key={index} value={color}>
              {color}
            </option>
          ))}
        </select>
        <Button type="submit" className="rounded-l-none border-l-0">
          Add
        </Button>
      </form>
      <div className="bg-gray-600 rounded-md rounded-t-none mt-0 pt-2 pb-1 px-4 select-none">
        {tags.length ? (
          tags.map(({ title, color, id }) => (
            <div
              key={id}
              className={`inline-block m-1 px-2 py-1 rounded text-xs text-white`}
              style={{ backgroundColor: color }}
            >
              {title}
              <button
                onClick={() => removeTag(id)}
                className="ml-2 text-white hover:text-gray-200"
              >
                &times;
              </button>
            </div>
          ))
        ) : (
          <div className="text-blue-100 truncate mb-1">Enter a tag</div>
        )}
      </div>
    </div>
  );
};

export default TagIntegrator;
