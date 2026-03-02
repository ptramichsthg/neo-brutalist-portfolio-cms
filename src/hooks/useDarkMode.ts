import { useState, useEffect } from 'react';

export type DarkMode = 'light' | 'dark';

export function useDarkMode() {
  const [theme, setTheme] = useState<DarkMode>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem('theme') as DarkMode | null;
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return { theme, toggleTheme };
}
