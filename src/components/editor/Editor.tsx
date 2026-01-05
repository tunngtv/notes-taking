import { useCallback, Ref } from "react";
import useCodeMirror from "../../hooks/useCodemirror";
import type { EditorState } from "@codemirror/state";
import { useTheme } from "@/hooks/useTheme";

import classes from "./editor.module.scss";

interface EditorProps {
  initialDoc: string;
  setDoc: (value: string) => void;
}

const Editor = ({ initialDoc, setDoc }: EditorProps) => {
  const { colorMode } = useTheme();
  const handleChange = useCallback(
    (state: EditorState) => {
      setDoc(state.doc.toString());
    },
    [setDoc]
  );

  const [refContainer] = useCodeMirror({
    initialDoc: initialDoc,
    onChange: handleChange,
    themeMode: colorMode,
  });

  return (
    <div className={classes.editor} ref={refContainer as Ref<HTMLDivElement>} />
  );
};

export default Editor;
