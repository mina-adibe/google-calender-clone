import React from "react";
import { Events } from "../context/types";

// custom hook useLocalStorage
export function useLocalStorage(key: string, initialValue: Events[]) {
  const [value, setValue] = React.useState<Events[]>(() => {
    const item = window.localStorage.getItem(key);
    if (item) {
      const parsedItem = JSON.parse(item) as Events[];
      const events = parsedItem.map((event) => {
        if (event.date instanceof Date) {
          return event;
        }
        return { ...event, date: new Date(event.date) };
      });
      return events;
    }
    return initialValue;
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
