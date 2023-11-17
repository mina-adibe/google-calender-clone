import React from "react";
import { formateDate } from "../utils/formatDate";
import { cc } from "../utils/cc";
import { endOfDay, isBefore, isSameMonth, isToday } from "date-fns";
import EventFormModal from "./EventFormModal";
import { useEvents } from "../context/useEvents";
import { Events } from "../context/types";

import CalendarEvent from "./CalendarEvent";
import OverflowContainer from "./OverflowContainer";
import ViewMoreCalendarEventsModal from "./ViewMoreCalendarEventsModal";

type CalendarDayProps = {
  day: Date;
  showWeekName: boolean;
  selectedMonth: Date;
  events: Events[];
};

const CalendarDay = ({ day, showWeekName, selectedMonth, events }: CalendarDayProps) => {
  // state for modal
  const [isNewEventModalOpen, setIsNewEventModalOpen] = React.useState(false);
  const [isViewMoreEventModalOpen, setisViewMoreEventModalOpen] = React.useState(false);

  const { addEvent } = useEvents();

  const sortedEvents = React.useMemo(() => {
    const timeToNumber = (time: string) => parseFloat(time.replace(":", "."));

    return [...events].sort((a, b) => {
      if (a.allDay && b.allDay) {
        return 0;
      } else if (a.allDay) {
        return -1;
      } else if (b.allDay) {
        return 1;
      } else {
        return timeToNumber(a.startTime) - timeToNumber(b.startTime);
      }
    });
  }, [events]);

  return (
    <div
      className={cc(
        "day",
        !isSameMonth(day, selectedMonth) && "non-month-day",
        isBefore(endOfDay(day), new Date()) && "old-month-day"
      )}>
      <div className="day-header">
        {showWeekName && <div className="week-name">{formateDate(day, { weekday: "long" })}</div>}
        <div className={cc("day-number", isToday(day) && "today")}>
          {formateDate(day, { day: "numeric" })}
        </div>
        <button
          className="add-event-btn"
          onClick={() => {
            setIsNewEventModalOpen(true);
          }}>
          +
        </button>
      </div>
      {sortedEvents.length > 0 && (
        <OverflowContainer
          className="events"
          getKey={(event) => event.id}
          items={sortedEvents}
          renderItem={(event) => <CalendarEvent event={event} />}
          renderOverflow={(amount) => (
            <>
              <button
                onClick={() => setisViewMoreEventModalOpen(true)}
                className="events-view-more-btn">
                + {amount} More{" "}
              </button>
              <ViewMoreCalendarEventsModal
                events={sortedEvents}
                isOpen={isViewMoreEventModalOpen}
                onClose={() => setisViewMoreEventModalOpen(false)}
              />
            </>
          )}
        />
      )}

      <EventFormModal
        date={day}
        isOpen={isNewEventModalOpen}
        onClose={() => setIsNewEventModalOpen(false)}
        onSubmit={addEvent}
      />
    </div>
  );
};

export default CalendarDay;
