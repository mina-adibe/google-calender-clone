import React from "react";
import { Context } from "./Events";

// custom hook
export function useEvents() {
  const context = React.useContext(Context);
  if (context == null) {
    throw new Error("useEvents must be used within a EventsProvider");
  }
  return context;
}
