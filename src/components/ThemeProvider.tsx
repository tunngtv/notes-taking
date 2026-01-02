import { useEffect, useState } from 'react';
import { ThemeContext, ThemeContextType } from '../contexts/ThemeContext';

// ThemeProvider component
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const initializeTheme = () => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setColorMode(savedTheme);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setColorMode(prefersDark ? 'dark' : 'light');
      }
    };

    initializeTheme();
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        setColorMode(mediaQuery.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    // Cleanup listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const toggleColorMode = () => {
    const newMode = colorMode === 'dark' ? 'light' : 'dark';
    setColorMode(newMode);
    localStorage.setItem('theme', newMode);
    document.documentElement.classList.toggle('dark', newMode === 'dark');
  };

  // Apply theme class to document element
  useEffect(() => {
    document.documentElement.classList.toggle('dark', colorMode === 'dark');
  }, [colorMode]);

  const contextValue: ThemeContextType = {
    colorMode,
    toggleColorMode,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
