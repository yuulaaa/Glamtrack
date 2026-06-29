import { useState } from 'react';

const VIEW_KEY = 'glamtrack-view';

export function useViewMode() {
  const [view, setViewState] = useState(
    () => localStorage.getItem(VIEW_KEY) || 'grid'
  );

  const setView = (v) => {
    localStorage.setItem(VIEW_KEY, v);
    setViewState(v);
  };

  return [view, setView];
}
