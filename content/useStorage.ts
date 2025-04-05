import { useEffect, useState } from "react";

export function useStorage<T = string | null>(key: string, defaultValue: T = null as T) {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    // Initial load
    chrome.storage.local.get([key], (result) => {
      if (result[key] !== undefined) {
        setValue(result[key]);
      }
    });

    // Listen for changes
    const handleChange = (changes: { [key: string]: chrome.storage.StorageChange }) => {
      if (changes[key]) {
        setValue(changes[key].newValue);
      }
    };

    chrome.storage.onChanged.addListener(handleChange);
    return () => chrome.storage.onChanged.removeListener(handleChange);
  }, [key]);

  return value;
}
