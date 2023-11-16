import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ModalProps } from "./types";
import { cc } from "../utils/cc";

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const prevIsOpen = useRef<boolean>();

  // TODO:REVISITE THIS
  // Getting the previous props or state via useRef
  useLayoutEffect(() => {
    if (!isOpen && prevIsOpen.current) {
      setIsClosing(true);
    }
    prevIsOpen.current = isOpen;
  }, [isOpen]);

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

  if (!isOpen && !isClosing) {
    return null;
  }

  // another solution : document.querySelector("#modal-container")!
  //onAnimationEnd to  remove "closing" class from modal
  return createPortal(
    <div onAnimationEnd={() => setIsClosing(false)} className={cc("modal", isClosing && "closing")}>
      <div className="overlay" onClick={onClose} />
      <div className="modal-body">{children}</div>
    </div>,
    document.querySelector("#modal-container") as HTMLElement
  );
};

export default Modal;
