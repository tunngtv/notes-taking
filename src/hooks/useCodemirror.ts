import { useEffect, useRef } from "react";
import { EditorState, Compartment } from "@codemirror/state";
import {
  EditorView,
  keymap,
  highlightActiveLine,
  lineNumbers,
  highlightActiveLineGutter,
} from "@codemirror/view";

import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";

import {
  indentOnInput,
  bracketMatching,
  syntaxHighlighting,
  defaultHighlightStyle,
  HighlightStyle,
} from "@codemirror/language";

import { tags } from "@lezer/highlight";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { oneDark } from "@codemirror/theme-one-dark";

// Light theme for CodeMirror
export const lightTheme = EditorView.baseTheme({
  "&": {
    backgroundColor: "hsl(var(--background))",
    color: "hsl(var(--foreground))",
    height: "100%",
  },
  ".cm-content": {
    caretColor: "hsl(var(--foreground))",
  },
  ".cm-cursor, .cm-dropCursor": { borderLeftColor: "hsl(var(--foreground))" },
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
    {
      backgroundColor: "hsl(var(--accent))",
    },
  ".cm-panels": {
    backgroundColor: "hsl(var(--background))",
    color: "hsl(var(--foreground))",
  },
  ".cm-panels.cm-panels-top": { borderBottom: "2px solid hsl(var(--border))" },
  ".cm-panels.cm-panels-bottom": { borderTop: "2px solid hsl(var(--border))" },
  ".cm-searchMatch": {
    backgroundColor: "hsl(var(--accent))",
    outline: "1px solid hsl(var(--accent-foreground))",
  },
  ".cm-searchMatch.cm-searchMatch-selected": {
    backgroundColor: "hsl(var(--accent-foreground))",
  },
  ".cm-activeLine": { backgroundColor: "hsl(var(--accent))" },
  ".cm-selectionMatch": { backgroundColor: "hsl(var(--accent))" },
  "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
    backgroundColor: "hsl(var(--accent))",
    outline: "1px solid hsl(var(--accent-foreground))",
  },
  ".cm-gutters": {
    backgroundColor: "hsl(var(--background))",
    color: "hsl(var(--muted-foreground))",
    borderRight: "1px solid hsl(var(--border))",
  },
  ".cm-activeLineGutter": {
    backgroundColor: "hsl(var(--accent))",
  },
  ".cm-foldPlaceholder": {
    backgroundColor: "hsl(var(--accent))",
    border: "1px solid hsl(var(--accent-foreground))",
    color: "hsl(var(--accent-foreground))",
  },
});

export const transparentTheme = EditorView.theme({
  "&": {
    backgroundColor: "transparent !important",
    height: "100%",
  },
});

const customHighlightStyle = HighlightStyle.define([
  {
    tag: tags.heading1,
    fontSize: "1.6em",
    fontWeight: "bold",
  },
  {
    tag: tags.heading2,
    fontSize: "1.4em",
    fontWeight: "bold",
  },
  {
    tag: tags.heading3,
    fontSize: "1.2em",
    fontWeight: "bold",
  },
]);

interface UseCodeMirrorProps {
  initialDoc?: string;
  onChange?: (state: EditorState) => void;
  themeMode?: "light" | "dark";
}

const useCodeMirror = ({
  initialDoc,
  onChange,
  themeMode = "dark",
}: UseCodeMirrorProps) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView | null>(null);
  const themeCompartment = useRef<Compartment | null>(null);

  useEffect(() => {
    if (!refContainer.current) return;

    // Initialize compartment if not already done
    if (!themeCompartment.current) {
      themeCompartment.current = new Compartment();
    }

    // Choose theme based on themeMode
    const themeExtension = themeMode === "light" ? lightTheme : oneDark;

    if (!editorViewRef.current) {
      // Create the editor for the first time
      const startState = EditorState.create({
        doc: initialDoc ?? "",
        extensions: [
          keymap.of([...defaultKeymap, ...historyKeymap]),
          lineNumbers(),
          highlightActiveLineGutter(),
          history(),
          indentOnInput(),
          bracketMatching(),
          syntaxHighlighting(defaultHighlightStyle),
          syntaxHighlighting(customHighlightStyle),
          highlightActiveLine(),
          markdown({
            base: markdownLanguage,
            codeLanguages: languages,
            addKeymap: true,
          }),
          themeCompartment.current.of(themeExtension),
          transparentTheme,
          EditorView.lineWrapping,
          EditorView.updateListener.of(update => {
            if (update.docChanged && onChange) {
              onChange(update.state);
            }
          }),
        ],
      });

      editorViewRef.current = new EditorView({
        state: startState,
        parent: refContainer.current,
      });
    } else {
      // Update the theme for existing editor
      const themeExtension = themeMode === "light" ? lightTheme : oneDark;
      editorViewRef.current.dispatch({
        effects: themeCompartment.current.reconfigure(themeExtension),
      });
    }

    return () => {
      editorViewRef.current?.destroy();
      editorViewRef.current = null;
    };
  }, [themeMode]); // Only recreate when theme changes

  // Sync external doc → editor
  useEffect(() => {
    const view = editorViewRef.current;
    if (!view || initialDoc == null) return;

    const current = view.state.doc.toString();
    if (current === initialDoc) return;

    view.dispatch({
      changes: {
        from: 0,
        to: view.state.doc.length,
        insert: initialDoc,
      },
    });
  }, [initialDoc]);

  return [refContainer] as const;
};

export default useCodeMirror;
