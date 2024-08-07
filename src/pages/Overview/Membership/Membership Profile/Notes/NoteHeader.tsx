/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { BiX } from "react-icons/bi";

interface NoteHeaderProps {
  notes: any;
  onClose: () => void;
}

const NoteHeader: React.FC<NoteHeaderProps> = ({ notes, onClose }) => {
  return (
    <div
      id="Note Header"
      className="flex justify-between items-center p-4 sticky top-0 ">
      <p className="text-[#141414] font-azoBold text-2xl flex gap-2 items-center">
        Comments
        <span className="font-azo text-lg text-[#434343]">
          {" "}
          ({notes ? notes.length : 0})
        </span>
      </p>
      <button onClick={onClose} className="text-[#434343] font-azo text-lg">
        <BiX className="size-7" />
      </button>
    </div>
  );
};

export default NoteHeader;
