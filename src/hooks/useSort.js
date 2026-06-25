import { useState } from 'react';
import { SORT_STORAGE_KEY } from '../utils/constants';

export function useSort() {
  const [sortBy, setSortByState] = useState(
    () => localStorage.getItem(SORT_STORAGE_KEY) || 'expiring-soon'
  );

  const setSortBy = (value) => {
    localStorage.setItem(SORT_STORAGE_KEY, value);
    setSortByState(value);
  };

  return [sortBy, setSortBy];
}
