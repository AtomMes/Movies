import { useEffect } from "react";

export function useDebounce<T>(
  value: T,
  delay: number,
  callback: () => void,
): void {
  useEffect(() => {
    const timer = setTimeout(() => callback(), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay, callback]);
}
