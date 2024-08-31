import { X } from "@phosphor-icons/react";
import { useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: (open: boolean) => void;
  children: React.ReactNode;
}

export function Modal({ open, onClose, children }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [open]);

  
  return (
    <div
      className={`
        fixed inset-0 h-screen z-50 flex justify-center items-center transition-colors
        ${open ? "visible bg-black/20" : "invisible"}
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white rounded-xl shadow transition-all
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <button
          onClick={() => onClose(!open)}
          className="absolute top-2 right-2 p-1 rounded-full"
        >
          <X size={24} color="#909090" />
        </button>
        {children}
      </div>
    </div>
  );
}
