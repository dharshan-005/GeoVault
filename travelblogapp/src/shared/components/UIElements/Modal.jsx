import React from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

import Backdrop from "./Backdrop";
import "./Modal.css";

const ModalOverlay = (props) => {
  const content = (
    <motion.div
      className={`modal ${props.className}`}
      style={props.style}
      initial={{ y: "-10rem", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "-10rem", opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>

      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (e) => e.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>

        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </motion.div>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("modal-hook")
  );
};

const Modal = (props) => {
  return (
    <AnimatePresence>
      {props.show && (
        <>
          <Backdrop onClick={props.onCancel} />

          <ModalOverlay {...props} />
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;

// import React from "react";
// import ReactDOM from "react-dom";
// import { CSSTransition } from "react-transition-group";

// import Backdrop from "./Backdrop";

// import "./Modal.css";

// const ModalOverlay = (props) => {
//   const content = (
//     <div className={`modal ${props.className}`} style={props.style}>
//       <header className={`modal__header ${props.headerClass}`}>
//         <h2>{props.header}</h2>
//       </header>

//       <form
//         onSubmit={
//           props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
//         }
//       >
//         <div className={`modal__content ${props.contentClass}`}>
//           {props.children}
//         </div>

//         <footer className={`modal__footer ${props.footerClass}`}>
//           {props.footer}
//         </footer>
//       </form>
//     </div>
//   );
//   return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
// };

// const Modal = (props) => {
//   return (
//     <>
//       {props.show && <Backdrop onClick={props.onCancel} />}

//       <CSSTransition
//         in={props.show}
//         mountOnEnter
//         unmountOnExit
//         timeout={200}
//         classNames="modal"
//       >
//         <ModalOverlay {...props} />
//       </CSSTransition>
//     </>
//   );
// };

// export default Modal;
