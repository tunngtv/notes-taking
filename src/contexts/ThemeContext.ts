import { createContext } from "react";

// Define the context type
export interface ThemeContextType {
  colorMode: "light" | "dark";
  toggleColorMode: () => void;
}

// Create and export the context
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
