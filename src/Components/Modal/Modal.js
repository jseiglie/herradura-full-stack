import axios from "axios";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// 'modal-root' is a sibling to 'app-root'
const modalRoot = document.getElementById("modal-root");

const Modal = ({ isOpen, children }, props) => {
  // element to which the modal will be rendered
  const el = document.createElement("div");
  const [data, setData] = useState([]);


  useEffect(() => {

    // append to root when the children of Modal are mounted
    modalRoot.appendChild(el);

    // do a cleanup
    return () => {
      modalRoot.removeChild(el);
    };
  }, [el]);

  return (
    isOpen &&
    createPortal(
      // child element
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          padding: "100px",
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: "9900",
        }}
      >
        <div
          style={{
            width: "50%",
            background: "white",
            padding: "50px",
            textAlign: "center",
          }}
        >
          
          {children}
        </div>
      </div>,
      // target container
      el
    )
  );
};

export default Modal;
