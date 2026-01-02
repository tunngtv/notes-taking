import { useEffect, useState } from "react";
import useNotes from "@/hooks/useNotes";
import Editor from "@/components/editor/Editor";
import Preview from "@/components/preview/Preview";
import PanelsFooter from "@/components/panelsFooter/PanelsFooter.component";

import { usePanelsStructure } from "./usePanelsStructure";

const PanelsContainer = () => {
  const { activeNote } = useNotes();

  const [IViews, view, setView, getPanelsStructure] = usePanelsStructure();
  const [doc, setDoc] = useState("");

  const currentId = activeNote?.id;

  useEffect(() => {
    if (!activeNote) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDoc(activeNote.content);
  }, [activeNote]);

  return (
    <div className={getPanelsStructure()}>
      {view === IViews.SPLITTED ? (
        <>
          <Editor
            key={`editor-${currentId || "default"}`}
            setDoc={setDoc}
            initialDoc={doc}
          />
          <Preview document={doc} />
        </>
      ) : view === IViews.ON ? (
        <Preview document={doc} />
      ) : (
        <Editor
          key={`editor-${currentId || "default"}`}
          setDoc={setDoc}
          initialDoc={doc}
        />
      )}
      <PanelsFooter
        setView={(viewValue) => setView(viewValue as "on" | "off" | "splitted")}
        IViews={IViews}
        doc={doc}
      />
    </div>
  );
};

export default PanelsContainer;
