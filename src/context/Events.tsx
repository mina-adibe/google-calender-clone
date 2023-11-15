import React from "react";
import { Events, EventsContext, EventsProviderProps, unionOmit } from "./types";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const Context = React.createContext<EventsContext | null>(null);

// context provider
export function EventsProvider({ children }: EventsProviderProps) {
  const [events, setEvents] = useLocalStorage("EVENTS", []);

  function addEvent(eventDetails: unionOmit<Events, "id">) {
    setEvents((e) => [...e, { ...eventDetails, id: crypto.randomUUID() }]);
  }

  function updateEvent(id: string, eventDetails: unionOmit<Events, "id">) {
    setEvents((e) => e.map((event) => (event.id === id ? { id, ...eventDetails } : event)));
  }

  function deleteEvent(id: string) {
    setEvents((e) => e.filter((event) => event.id !== id));
  }

  return (
    <Context.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </Context.Provider>
  );
}
