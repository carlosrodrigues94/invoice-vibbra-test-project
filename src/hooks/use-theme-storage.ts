import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type IStateReturnType<T> = [T, Dispatch<SetStateAction<T>>];

function useThemeStorage<T>(
  initialValue: Record<string, unknown>,
): IStateReturnType<T> {
  const key = 'theme';

  const [state, setState] = useState(() => {
    if (typeof window === 'undefined') return initialValue;

    const themeStorage = localStorage.getItem(key);

    if (themeStorage) {
      return JSON.parse(themeStorage);
    }
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default useThemeStorage;
