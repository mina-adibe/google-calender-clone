import { formateDate } from "../utils/formatDate";
import CalendarEvent from "./CalendarEvent";
import Modal from "./Modal";
import { ViewMoreCalendarEventsModalProps } from "./types";

const ViewMoreCalendarEventsModal = ({
  events,
  ...modalProps
}: ViewMoreCalendarEventsModalProps) => {
  if (events.length === 0) return null;
  return (
    <Modal {...modalProps}>
      <div className="modal-title">
        <small>{formateDate(events[0].date, { dateStyle: "short" })}</small>

        <button className="close-btn" onClick={modalProps.onClose}>
          &times;
        </button>
      </div>

      <div className="events">
        {events.map((event) => (
          <CalendarEvent key={event.id} event={event} />
        ))}
      </div>
    </Modal>
  );
};

export default ViewMoreCalendarEventsModal;
