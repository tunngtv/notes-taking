/**
 * Initial note data for the application
 * This file defines the default note that appears when the app starts
 */

import { Note } from "../types/note";
import { generateUUID } from "../utils/uuid";

// Define the initial note content
const initialNoteContent = `## Welcome to *Markdown* Notes

![ ](https://media.giphy.com/media/eNAsjO55tPbgaor7ma/giphy.gif)

Here you can create and manage your notes created with **Markdown**, a special application for those who like to write markdown, it is also quite useful to reinforce their knowledge in this language ✍

This app uses **GitHub Flavored Markdown**, the dialect of Markdown that is currently supported for user content on and GitHub 😎

---

Learn [the basic markdown syntax](https://www.markdownguide.org/basic-syntax/).
`;

/**
 * Initial note object with default values
 * Used to populate the application when no notes exist
 */
export const initialNote: Note = {
  id: generateUUID(),
  title: "Welcome to Markdown Notes",
  content: initialNoteContent,
  tags: [
    {
      title: "Example",
      color: "pink",
    },
  ],
  createdAt: Date.now(),
  updatedAt: Date.now(),
};
