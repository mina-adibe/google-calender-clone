import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ModalProps } from "./types";

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  // make a useeffect to close the modal when the user clicks outside of the modal

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (e.target === e.currentTarget) {
        onClose();
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  // another solution : document.querySelector("#modal-container")!

  return createPortal(
    <div className="modal" style={{ display: isOpen ? "block" : "none" }}>
      <div className="overlay" onClick={onClose} />
      <div className="modal-body">{children}</div>
    </div>,
    document.querySelector("#modal-container") as HTMLElement
  );
};

export default Modal;
