import { useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

export function Modal({ children }) {
  const el = useRef(document.createElement("div"));

  useEffect(() => {
    const modalRoot = document.querySelector("#modal-root");
    modalRoot.appendChild(el.current);
    return () => void modalRoot.removeChild(el.current);
  }, []);

  return createPortal(children, el.current);
};
