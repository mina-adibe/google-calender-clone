import { ReactNode } from "react";

export const EVENT_COLORS = ["red", "blue", "green"] as const;

export type Events = {
  id: string;
  name: string;
  color: (typeof EVENT_COLORS)[number];
  date: Date;
} & (
  | { allDay: false; startTime: string; endTime: string }
  | { allDay: true; startTime?: never; endTime?: never }
);

// we could use   addEvent: (event: Omit<Events, "id">) => void;
// but it s not working when we have a union type in Events
// so we use this instead

// TODO: revisit unionOmit type
export type EventsContext = {
  events: Events[];
  addEvent: (event: unionOmit<Events, "id">) => void;
  updateEvent: (id: string, event: unionOmit<Events, "id">) => void;
  deleteEvent: (id: string) => void;

  //   deleteEvent: (id: string) => void;
};

export type EventsProviderProps = {
  children: ReactNode;
};

export type unionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
