import { useCallback, Ref } from "react";
import useCodeMirror from "../../hooks/useCodemirror";
import type { EditorState } from "@codemirror/state";

import classes from "./editor.module.scss";

interface EditorProps {
  initialDoc: string;
  setDoc: (value: string) => void;
}

const Editor = ({ initialDoc, setDoc }: EditorProps) => {
  const handleChange = useCallback(
    (state: EditorState) => {
      setDoc(state.doc.toString());
    },
    [setDoc]
  );

  const [refContainer] = useCodeMirror({
    initialDoc: initialDoc,
    onChange: handleChange,
  });

  return (
    <div
      className={classes.editor}
      ref={refContainer as Ref<HTMLDivElement>}
    ></div>
  );
};

export default Editor;
