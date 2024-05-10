import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center z-50 items-center transition-colors bg-black/20
      }`}
    >
      {children}
    </div>
  );
};

export default Modal;
