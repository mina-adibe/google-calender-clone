import React from "react";
import { unionOmit, Events } from "../context/types";

export type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export type EventFormModalProps = {
  onSubmit: (event: unionOmit<Events, "id">) => void;
} & (
  | { onDelete: () => void; event: Events; date?: never }
  | { onDelete?: never; event?: never; date: Date }
) &
  Omit<ModalProps, "children">;

export type OverflowContainerProps<T> = {
  items: T[];
  getKey: (item: T) => React.Key;
  renderItem: (item: T) => React.ReactNode;
  renderOverflow: (overflowAmount: number) => React.ReactNode;
  className?: string;
};

export type ViewMoreCalendarEventsModalProps = {
  events: Events[];
} & Omit<ModalProps, "children">;
