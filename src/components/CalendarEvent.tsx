import React from "react";
import { formateDate } from "../utils/formatDate";
import { cc } from "../utils/cc";
import { parse } from "date-fns";
import { Events } from "../context/types";
import EventFormModal from "./EventFormModal";
import { useEvents } from "../context/useEvents";

function CalendarEvent({ event }: { event: Events }) {
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  const { updateEvent, deleteEvent } = useEvents();
  return (
    <>
      <button
        onClick={() => setIsEditModalOpen(true)}
        className={cc("event", event.color, event.allDay && "all-day-event")}>
        {event?.allDay ? (
          <div className="event-name">{event.name}</div>
        ) : (
          <>
            <div className={`color-dot ${event.color}`}></div>
            <div className="event-time">
              {formateDate(parse(event.startTime, "HH:MM", event.date), { timeStyle: "short" })}
            </div>
            <div className="event-name">{event.name}</div>
          </>
        )}
      </button>

      <EventFormModal
        event={event}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={(e) => updateEvent(event?.id, e)}
        onDelete={() => deleteEvent(event.id)}
      />
    </>
  );
}

export default CalendarEvent;
