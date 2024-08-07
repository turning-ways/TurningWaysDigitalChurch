import React from "react";
import NoteHeader from "./Notes/NoteHeader";
import EditableDiv from "@/ui/commentTextArea";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/Avatar";
import { BiSend } from "react-icons/bi";
import useGetNote from "@/hooks/Notes/useGetNote";
import useAddNote from "@/hooks/Notes/useAddNote";
import { Puff } from "react-loader-spinner";

interface NotesProps {
  openNote: boolean;
  onClose: () => void;
}

const Notes: React.FC<NotesProps> = ({ openNote, onClose }) => {
  const queryParams = new URLSearchParams(window.location.search);
  const createdBy = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") ?? "").memberId
    : "";
  const memberId = queryParams.get("id");
  const { data: notes, refetch } = useGetNote(memberId ?? "");
  const { mutate: addNote, isPending: isAddingNote } = useAddNote(
    memberId ?? "",
    () => {
      setValue("");
      refetch();
    }
  );
  const [value, setValue] = React.useState<string>("");

  const handleAddNote = (value: string) => {
    addNote({
      note: value,
      createdBy,
    });
  };

  return (
    <>
      <div
        className={`${
          openNote ? "block" : "hidden"
        } fixed inset-0 z-50 overflow-y-auto `}>
        <div className="absolute bottom-5 right-0 md:right-8 h-[600px] max-h-[600px] w-full md:w-[500px] rounded-md bg-white z-50 p-2">
          <NoteHeader notes={notes} onClose={onClose} />
          <div className="h-[75%] overflow-y-auto py-1">
            {notes
              ?.sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              ) // Sort by date in descending order
              .map((note) => (
                <div key={note.id} className="flex space-x-3 mt-4 w-full">
                  <Avatar>
                    <AvatarImage src="" alt="" />
                    <AvatarFallback className="bg-gray-200">
                      {note?.createdBy?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="gap-1 w-full flex flex-col">
                    <div className="flex justify-between w-full">
                      <p className="text-[#727171] font-semibold flex items-center">
                        {note?.createdBy?.name} -
                        <span className="text-xs font-light">
                          {note?.createdBy?.role}
                        </span>
                      </p>
                      <p className="text-[#727171] text-sm pr-2">
                        {formatTime(note.date)}
                      </p>
                    </div>
                    <EditableDiv
                      value={note.comment}
                      noteId={note.id}
                      memberId={memberId ?? ""}
                      isEdited={note?.isEdited}
                      onChange={(value) => console.log(value)}
                      className="!h-fit pr-4"
                    />
                  </div>
                </div>
              ))}
          </div>
          <div className="flex justify-center items-center mt-4 h-fit">
            <textarea
              onInput={(e) => {
                e.currentTarget.style.height = "auto";
                e.currentTarget.style.height =
                  e.currentTarget.scrollHeight - 8 + "px";
              }}
              onChange={(e) => setValue(e.target.value)}
              value={value}
              placeholder="Add a comment"
              className="w-full border resize-none h-11 max-h-14  border-gray-300 mb-2 p-2 rounded-none focus-visible:rounded-none focus-visible:outline-none focus-visible:border-primaryDark transition-all duration-200 ease-in-out caret-primaryDark"
            />
            <button
              className="bg-primaryDark text-white px-4 py-3 mb-2 "
              onClick={() => handleAddNote(value)}>
              {isAddingNote ? (
                <Puff height="25" width="18" color="#ffffff" />
              ) : (
                <BiSend className="text-xl" />
              )}
            </button>
          </div>
        </div>
        {/* A backdrop to close the modal */}
        <div
          className={`${
            openNote ? "block" : "hidden"
          } fixed inset-0 bg-black/40`}
          onClick={onClose}
        />
      </div>
    </>
  );
};

export default Notes;

export const formatTime = (timestamp: string | Date) => {
  const now = new Date();
  const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;

  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);

  if (diffSec < 60) return `${diffSec} s ago`;
  if (diffMin < 60) return `${diffMin} m ago`;
  if (diffHour < 24) return `${diffHour} h ago`;
  if (diffDay === 1) return "yesterday";
  if (diffDay < 7) return `${diffDay} d ago`;
  if (diffWeek < 4) return `${diffWeek} w ago`;

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};
