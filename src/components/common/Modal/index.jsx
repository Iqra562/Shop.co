import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose,onDelete, title, text,isLoading }) => {
  useEffect(() => {
     if (isOpen) {
       document.body.style.overflow = "hidden";
     } else {
       document.body.style.overflow = "auto";
     }
 
     // Cleanup
     return () => {
       document.body.style.overflow = "auto";
     };
   }, [isOpen]);
    if (!isOpen) return null; 

  return ReactDOM.createPortal(
    <div  onClick={onClose}  className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div  onClick={(e) => e.stopPropagation()}  className="bg-zinc-300 bgwhite rounded-lg p-3 relative min-w-[350px] space-y-6">
        <div className="space-y-3">
          <div>{title}</div>
          <p className="text-sm">{text}</p>
        </div>
        <div className="flex justify-end space-x-1">
          <button  disabled={isLoading}  onClick={onClose} className="rounded-full border-zinc-400 border-2 w-fit px-3 py-1.5 flex justify-center items-center capitalize text-xs font-bold cursor-pointer">
            cancel
          </button>
          <button disabled={isLoading} onClick={onDelete} className="rounded-full  bg-red-500 text-white w-fit px-3 py-1.5 flex justify-center items-center capitalize text-xs font-bold cursor-pointer">
            delete{" "}
          </button>
        </div>{" "}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
