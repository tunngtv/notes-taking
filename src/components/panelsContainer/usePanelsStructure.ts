import { useState } from "react";

import styles from "./panels-container.module.scss";

const IViews = {
  ON: "on",
  OFF: "off",
  SPLITTED: "splitted",
} as const;

type ViewType = (typeof IViews)[keyof typeof IViews];

export function usePanelsStructure(): [
  typeof IViews,
  ViewType,
  React.Dispatch<React.SetStateAction<ViewType>>,
  () => string,
] {
  const { ON, OFF, SPLITTED } = IViews;

  const [view, setView] = useState<ViewType>(SPLITTED);

  const getPanelsStructure = (): string => {
    if (view === SPLITTED) {
      return `${styles.panelsContainer}`;
    }

    if (view === ON) {
      return `${styles.panelsContainer} ${styles.panelsContainerViewOn}`;
    }

    if (view === OFF) {
      return `${styles.panelsContainer} ${styles.panelsContainerViewOff}`;
    }

    return `${styles.panelsContainer}`;
  };

  return [IViews, view, setView, getPanelsStructure];
}
