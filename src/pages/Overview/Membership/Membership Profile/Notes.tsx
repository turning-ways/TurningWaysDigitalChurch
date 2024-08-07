import { BiSend } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Puff, ThreeDots } from "react-loader-spinner";
import useAddNote from "../../../../hooks/Notes/useAddNote";
import useGetMemberDetails from "../../../../hooks/Member/member-service/useGetMemberDetails";
import useGetNote from "../../../../hooks/Notes/useGetNote";
import useDeleteNote from "../../../../hooks/Notes/useDeleteNote";
import useUpdateNote from "../../../../hooks/Notes/useUpdateNote";
import Modal from "../../../../ui/Modal/Modal";
import { useEffect, useRef, useState } from "react";

interface NotesProps {
  openNote: boolean;
  onClose: () => void;
}

const formatTime = (timestamp: string | Date) => {
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

const Notes: React.FC<NotesProps> = ({ openNote, onClose }) => {
  const queryParams = new URLSearchParams(window.location.search);
  const createdBy = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") ?? "").memberId
    : "";
  const memberId = queryParams.get("id");

  const [value, setValue] = useState<string>("");
  const { mutate: addNote, isPending: isAddingNote } = useAddNote(
    memberId ?? "",
    () => setValue("")
  );
  const { data: memberDetails } = useGetMemberDetails();
  const { data: notes, refetch } = useGetNote(memberId ?? "");
  const { mutate: deleteNote, isPending: isDeletingNote } = useDeleteNote(
    memberId ?? ""
  );
  const { mutate: updateNote, isPending: isUpdatingNote } = useUpdateNote({
    memberId: memberId ?? "",
  });

  const [editedComments, setEditedComments] = useState<{
    [key: string]: string;
  }>({});
  const [updateNoteIndex, setUpdateNoteIndex] = useState<number | null>(null);
  const textAreaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

  useEffect(() => {
    if (updateNoteIndex !== null && textAreaRefs.current[updateNoteIndex]) {
      textAreaRefs.current[updateNoteIndex].focus();
    }
  }, [updateNoteIndex]);

  // A useeffect to make all the textareas the fit the content
  useEffect(() => {
    textAreaRefs.current.forEach((ref) => {
      if (ref) {
        ref.style.height = "auto";
        ref.style.height = `${ref.scrollHeight}px`;
      }
    });
  }, [notes]);

  const handleEditComment = (noteId: string, comment: string) => {
    setEditedComments((prevComments) => ({
      ...prevComments,
      [noteId]: comment,
    }));
  };

  const handleAddNoteKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addNote({ note: value, createdBy: createdBy });
      refetch();
    }
  };

  const handleEditClick = (index: number) => {
    if (updateNoteIndex === index) {
      setUpdateNoteIndex(null);
      setTimeout(() => setUpdateNoteIndex(index), 0);
    } else {
      setUpdateNoteIndex(index);
    }
  };

  const handleUpdateNote = (noteId: string) => {
    updateNote({
      note:
        editedComments[noteId] ??
        notes?.find((n) => n.id === noteId)?.comment ??
        "",
      memberId: memberId ?? "",
      noteId: noteId,
    });
    setUpdateNoteIndex(null);
  };

  return (
    <>
      <div
        className={`bg-slate-600 justify-center ${
          openNote ? "flex" : "hidden"
        }`}>
        <div className="absolute bottom-0 right-0 md:right-10 mb-2 flex flex-col h-[600px] z-[1000] md:h-[700px] overflow-y-scroll text-white bg-white px-2">
          <div className="bg-white p-4 md:w-[600px] w-[90svw]">
            <div className="flex justify-between">
              <p className="text-[#141414] font-azoBold text-2xl">
                Comments
                <span className="font-azo text-xl text-[#434343]">
                  {" "}
                  ({notes ? notes.length : 0})
                </span>
              </p>
              <IoClose
                className="text-[#141414] text-2xl cursor-pointer"
                onClick={onClose}
              />
            </div>
            {notes &&
              notes
                .slice() // Create a copy of the array to avoid mutating the original data
                .sort((a, b) => {
                  // Assuming note.date is a string or Date object
                  return (
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                  );
                })
                .map((note, index) => (
                  <div key={note.id} className="flex space-x-3 mt-4">
                    <div className="bg-[#D9D9D9] text-[#2A2A2A] h-10 w-10 flex items-center justify-center rounded-full">
                      {memberDetails?.member?.profile?.firstName
                        ?.charAt(0)
                        ?.toUpperCase()}
                    </div>
                    <div className="space-y-2 w-full">
                      <div className="flex  justify-between text-[#727171]">
                        <p className="font-semibold flex flex-col md:flex-row">
                          {note.createdBy?.name}
                        </p>
                        <p>{formatTime(note.date)}</p>
                      </div>
                      <textarea
                        onInput={(e) => {
                          e.currentTarget.style.height = "auto";
                          e.currentTarget.style.height =
                            e.currentTarget.scrollHeight + "px";
                        }}
                        ref={(el) => {
                          textAreaRefs.current[index] = el;
                        }}
                        readOnly={index !== updateNoteIndex}
                        className="text-[#434343] w-full   rounded-md outline-none px-3 pt-2 resize-none overflow-hidden"
                        value={
                          editedComments[note.id] ??
                          (note.comment && note.isEdited
                            ? // If the note has been edited, add (edited) to the comment and if the note is being edited, remove the (edited) text
                              `${note.comment} (edited)`
                            : note.comment)
                        }
                        onChange={(e) =>
                          handleEditComment(note.id, e.target.value)
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && index === updateNoteIndex) {
                            handleUpdateNote(note.id);
                          }
                        }}
                      />
                      <div className="flex justify-end space-x-2">
                        <FiEdit
                          className="text-gray-400 text-lg cursor-pointer"
                          onClick={() => handleEditClick(index)}
                        />
                        <MdOutlineDelete
                          className="text-[#F24E1E] text-lg cursor-pointer"
                          onClick={() => {
                            memberId &&
                              deleteNote({ memberId, noteId: note.id });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
          </div>
          <div className="bg-white w-full border flex mb-2 items-stretch sticky bottom-0">
            <input
              type="text"
              value={value}
              className="flex-grow text-black p-2 outline-none shadow-md"
              placeholder="Type your comment here"
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleAddNoteKeyDown}
            />
            <button
              className="bg-[#17275B] text-white px-3 flex items-center"
              onClick={() => {
                addNote({ note: value, createdBy: createdBy });
                setValue("");
                refetch();
              }}>
              {!isAddingNote ? (
                <BiSend />
              ) : (
                <Puff height="25" width="18" color="#ffffff" />
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
      {(isDeletingNote || isUpdatingNote) && (
        <Modal onClose={() => console.log("Do nothing")}>
          <ThreeDots color="black" />
        </Modal>
      )}
    </>
  );
};

export default Notes;
