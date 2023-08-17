import { ModalProps } from "@/types";
import { AiOutlineClose } from "react-icons/ai";
import { CSSTransition } from "react-transition-group";
import styles from "./index.module.scss";

// A general modal (an overlay and a modal) receives a children to be displayed
const Modal = ({ open, title, onClose, children }: ModalProps) => {
  return (
    <CSSTransition timeout={300} in={open} unmountOnExit mountOnEnter>
      {(state) => (
        <div
          className={`${styles.overlay} fixed bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center inset-0`}
          onClick={onClose}
          data-state={state}
        >
          <dialog
            //   if the state is exited the component will be removed from the DOM
            open={state !== "exited"}
            className={`${styles.modal} container flex rounded-md max-w-md bg-gray-900 text-white p-3 divide-y gap-2  flex-col shadow-lg`}
            data-state={state}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                title="Close Modal"
                className="transition-colors hover:bg-gray-100 rounded-md p-1 "
              >
                <AiOutlineClose />
              </button>
            </div>
            {children}
          </dialog>
        </div>
      )}
    </CSSTransition>
  );
};
export default Modal;
