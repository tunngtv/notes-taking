import { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
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
}

const useCodeMirror = ({ initialDoc, onChange }: UseCodeMirrorProps) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!refContainer.current || editorViewRef.current) return;

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
        oneDark,
        transparentTheme,
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
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

    return () => {
      editorViewRef.current?.destroy();
      editorViewRef.current = null;
    };
  }, []);

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
