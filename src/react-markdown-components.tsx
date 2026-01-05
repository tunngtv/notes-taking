import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { atomOneLight } from "react-syntax-highlighter/dist/cjs/styles/hljs";

// Define types for ReactMarkdown components
type CodeComponentProps = {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

type TextComponentProps = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLParagraphElement>;

type HeadingComponentProps = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>;

// Function to get components based on theme mode
export const getComponents = (themeMode: "light" | "dark" = "dark") => {
  const syntaxHighlightStyle =
    themeMode === "light" ? atomOneLight : atomOneDark;

  return {
    code({ inline, className, children, ...props }: CodeComponentProps) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          language={match[1]}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          style={syntaxHighlightStyle as any}
          customStyle={{ margin: "1rem 0", borderRadius: "4px" }}
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    p({ children, ...props }: TextComponentProps) {
      return (
        <p className="mb-2" {...props}>
          {children}
        </p>
      );
    },
    h1({ children, ...props }: HeadingComponentProps) {
      return (
        <div style={{ margin: "1rem 0" }}>
          <h1
            className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
            {...props}
          >
            {children}
          </h1>
          <hr className="my-4 h-px border-0 bg-muted" />
        </div>
      );
    },
    h2({ children, ...props }: HeadingComponentProps) {
      return (
        <div style={{ margin: "1rem 0" }}>
          <h2
            className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
            {...props}
          >
            {children}
          </h2>
          <hr className="my-4 h-px border-0 bg-muted" />
        </div>
      );
    },
    h3({ children, ...props }: HeadingComponentProps) {
      return (
        <div>
          <h3
            className="scroll-m-20 text-2xl font-semibold tracking-tight"
            {...props}
          >
            {children}
          </h3>
          <hr className="my-4 h-px border-0 bg-muted" />
        </div>
      );
    },
  };
};

// Keep the original export for backward compatibility
export const components = getComponents("dark");
