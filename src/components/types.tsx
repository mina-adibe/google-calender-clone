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
