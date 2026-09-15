import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { SiteMode } from '../types/vehicle';

interface ModeContextValue {
  mode: SiteMode;
  setMode: (mode: SiteMode) => void;
}

const ModeContext = createContext<ModeContextValue | undefined>(undefined);

interface ModeProviderProps {
  children: React.ReactNode;
  initialMode?: SiteMode;
}

export function ModeProvider({ children, initialMode = 'buy' }: ModeProviderProps) {
  const [mode, setMode] = useState<SiteMode>(() => {
    const saved = window.localStorage.getItem('mugah-site-mode');
    return saved === 'buy' || saved === 'hire' ? saved : initialMode;
  });
  useEffect(() => {
    window.localStorage.setItem('mugah-site-mode', mode);
  }, [mode]);
  const value = useMemo(() => ({ mode, setMode }), [mode]);
  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export function useMode(): ModeContextValue {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used inside a ModeProvider');
  }
  return context;
}
