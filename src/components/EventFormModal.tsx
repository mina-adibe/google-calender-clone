import { FormEvent, Fragment, useId, useRef, useState } from "react";
import { formateDate } from "../utils/formatDate";
import Modal from "./Modal";
import { EventFormModalProps } from "./types";
import { EVENT_COLORS, Events, unionOmit } from "../context/types";

function EventFormModal({ onSubmit, onDelete, event, date, ...modalProps }: EventFormModalProps) {
  const [selectedColor, setSelectedColor] = useState(event?.color || EVENT_COLORS[0]);

  const [isAllDayChecked, setIsAllDayChecked] = useState(event?.allDay || false);

  const [startTime, setStartTime] = useState(event?.startTime || "");

  // create ref for end time input endTimeRef
  const endTimeRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const isNew: boolean = event == null;
  const formId = useId();

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const name = nameRef.current?.value;
    const endTime = endTimeRef.current?.value;

    // validation on : name, startTime, endTime
    // check to not be null or empty
    if (name == null || name.length === 0) {
      alert("Name is required");
      return;
    }
    const commonProps = {
      name,
      color: selectedColor,
      date: date || event.date,
    };

    let newEvent: unionOmit<Events, "id">;

    if (isAllDayChecked) {
      newEvent = {
        ...commonProps,
        allDay: true,
      };
    } else {
      if (startTime == null || startTime.length === 0 || endTime == null || endTime.length === 0) {
        return;
      }
      newEvent = {
        ...commonProps,
        allDay: false,
        startTime,
        endTime,
      };
    }

    modalProps.onClose();
    onSubmit(newEvent);
  }

  return (
    <Modal {...modalProps}>
      <div className="modal-title">
        <div> {isNew ? "Add" : "Edit"} Event</div>
        <small>{formateDate(date || event.date, { dateStyle: "short" })}</small>

        <button className="close-btn" onClick={modalProps.onClose}>
          &times;
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor={`${formId}-name`}>Name</label>
          <input
            defaultValue={event?.name}
            ref={nameRef}
            required
            type="text"
            id={`${formId}-name`}
          />
        </div>
        <div className="form-group checkbox">
          <input
            type="checkbox"
            name="all-day"
            id={`${formId}-all-day`}
            onChange={(e) => {
              setIsAllDayChecked(e.target.checked);
            }}
            checked={isAllDayChecked}
          />
          <label htmlFor={`${formId}-all-day`}>All Day?</label>
        </div>
        <div className="row">
          <div className="form-group">
            <label htmlFor={`${formId}-start-time`}>Start Time</label>
            <input
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
              }}
              required={!isAllDayChecked}
              disabled={isAllDayChecked}
              type="time"
              name="start-time"
              id={`${formId}-start-time`}
            />
          </div>
          <div className="form-group">
            <label htmlFor={`${formId}-end-time`}>End Time</label>
            <input
              ref={endTimeRef}
              min={startTime}
              defaultValue={event?.endTime}
              required={!isAllDayChecked}
              disabled={isAllDayChecked}
              type="time"
              name="end-time"
              id={`${formId}-end-time`}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Color</label>
          <div className="row left">
            {EVENT_COLORS.map((color) => (
              <Fragment key={color}>
                <input
                  type="radio"
                  name="color"
                  value={color}
                  id={`${formId}-${color}`}
                  checked={color === selectedColor}
                  onChange={() => {
                    setSelectedColor(color);
                  }}
                  className="color-radio"
                />

                <label htmlFor={`${formId}-${color}`}>
                  <span className="sr-only">{color}</span>
                </label>
              </Fragment>
            ))}

            <label htmlFor={`${formId}-green`}>
              <span className="sr-only">Green</span>
            </label>
          </div>
        </div>
        <div className="row">
          <button className="btn btn-success" type="submit">
            {isNew ? "Add" : "Edit"}
          </button>
          {onDelete != null && (
            <button className="btn btn-delete" type="button" onClick={onDelete}>
              Delete
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}

export default EventFormModal;
