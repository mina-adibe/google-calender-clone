import React from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isSameDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import CalendarDay from "./CalendarDay";
import { formateDate } from "../utils/formatDate";
import { useEvents } from "../context/useEvents";

const Calendar = () => {
  const [selectedMonth, setSelectedMonth] = React.useState(new Date());

  const calendarDays = React.useMemo(() => {
    const firstWeekStart = startOfWeek(startOfMonth(selectedMonth));
    const lastWeekEnd = endOfWeek(endOfMonth(selectedMonth));
    return eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd });
  }, [selectedMonth]);

  const { events } = useEvents();
  return (
    <div id="root">
      <div className="calendar">
        <div className="header">
          <button
            className="btn"
            onClick={() => {
              setSelectedMonth(new Date());
            }}>
            Today
          </button>
          <div>
            <button
              className="month-change-btn"
              onClick={() => {
                setSelectedMonth((m) => subMonths(m, 1));
              }}>
              &lt;
            </button>
            <button
              className="month-change-btn"
              onClick={() => {
                setSelectedMonth((m) => addMonths(m, 1));
              }}>
              &gt;
            </button>
          </div>
          <span className="month-title">
            {formateDate(selectedMonth, { month: "long", year: "numeric" })}
          </span>
        </div>
        <div className="days">
          {calendarDays.map((day, index) => {
            return (
              <CalendarDay
                key={day.getTime()}
                day={day}
                showWeekName={index < 7}
                selectedMonth={selectedMonth}
                events={events.filter((e) => isSameDay(day, e.date))}
              />
            );
          })}
        </div>
      </div>

      {/*
          <div className="modal">
            <div className="overlay"></div>
            <div className="modal-body">


              <div className="modal-title">
                6/8/23
                <button className="close-btn">&times;</button>
              </div>
              <div className="events">
                <button className="all-day-event green event">
                  <div className="event-name">Short</div>
                </button>
                <button className="event">
                  <div className="color-dot blue"></div>
                  <div className="event-time">7am</div>
                  <div className="event-name">Event Name</div>
                </button>
                <button className="event">
                  <div className="color-dot green"></div>
                  <div className="event-time">8am</div>
                  <div className="event-name">Event Name</div>
                </button>
                <button className="event">
                  <div className="color-dot blue"></div>
                  <div className="event-time">9am</div>
                  <div className="event-name">Event Name</div>
                </button>
                <button className="event">
                  <div className="color-dot blue"></div>
                  <div className="event-time">10am</div>
                  <div className="event-name">Event Name</div>
                </button>
              </div>

  <!--
   <div class="modal">
        <div class="overlay"></div>
        <div class="modal-body">


          <div class="modal-title">
            6/8/23
            <button class="close-btn">&times;</button>
          </div>
          <div class="events">
            <button class="all-day-event green event">
              <div class="event-name">Short</div>
            </button>
            <button class="event">
              <div class="color-dot blue"></div>
              <div class="event-time">7am</div>
              <div class="event-name">Event Name</div>
            </button>
            <button class="event">
              <div class="color-dot green"></div>
              <div class="event-time">8am</div>
              <div class="event-name">Event Name</div>
            </button>
            <button class="event">
              <div class="color-dot blue"></div>
              <div class="event-time">9am</div>
              <div class="event-name">Event Name</div>
            </button>
            <button class="event">
              <div class="color-dot blue"></div>
              <div class="event-time">10am</div>
              <div class="event-name">Event Name</div>
            </button>
          </div>



        </div>
      </div>
      -->

            </div>
          </div>

          <div className="modal">
            <div className="overlay"></div>
            <div className="modal-body">
              <div className="modal-title">
                <div>Add Event</div>
                <small>6/8/23</small>
                <button className="close-btn">&times;</button>
              </div>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" id="name" />
                </div>
                <div className="form-group checkbox">
                  <input type="checkbox" name="all-day" id="all-day" />
                  <label htmlFor="all-day">All Day?</label>
                </div>
                <div className="row">
                  <div className="form-group">
                    <label htmlFor="start-time">Start Time</label>
                    <input type="time" name="start-time" id="start-time" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="end-time">End Time</label>
                    <input type="time" name="end-time" id="end-time" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Color</label>
                  <div className="row left">
                    <input
                      type="radio"
                      name="color"
                      value="blue"
                      id="blue"
                      checked
                      className="color-radio"
                    />
                    <label htmlFor="blue">
                      <span className="sr-only">Blue</span>
                    </label>
                    <input type="radio" name="color" value="red" id="red" className="color-radio" />
                    <label htmlFor="red">
                      <span className="sr-only">Red</span>
                    </label>
                    <input
                      type="radio"
                      name="color"
                      value="green"
                      id="green"
                      className="color-radio"
                    />
                    <label htmlFor="green">
                      <span className="sr-only">Green</span>
                    </label>
                  </div>
                </div>
                <div className="row">
                  <button className="btn btn-success" type="submit">
                    Add
                  </button>
                  <button className="btn btn-delete" type="button">
                    Delete
                  </button>
                </div>
              </form>
            </div>
          </div> */}
    </div>
  );
};

export default Calendar;
