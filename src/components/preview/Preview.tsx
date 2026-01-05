import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTheme } from "@/hooks/useTheme";
import { getComponents } from "../markdown/react-markdown-components";
// import './preview.module.scss';
import styles from "./preview.module.scss";

// Define the type for the document prop
interface PreviewProps {
  document: string;
}

const Preview: React.FC<PreviewProps> = React.memo(({ document }) => {
  const { colorMode } = useTheme();

  const components = useMemo(() => getComponents(colorMode), [colorMode]);

  return (
    <div className={styles.preview}>
      <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
        {document || ""}
      </ReactMarkdown>
    </div>
  );
});

export default Preview;
