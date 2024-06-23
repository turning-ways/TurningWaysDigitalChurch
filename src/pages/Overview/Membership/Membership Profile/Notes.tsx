import { BiSend } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import useAddNote from "../../../../hooks/Notes/useAddNote";
import useGetMemberDetails from "../../../../hooks/Member/member-service/useGetMemberDetails";
import useGetNote from "../../../../hooks/Notes/useGetNote";
import { useEffect, useRef, useState } from "react";
import { formatDate } from "./PersonalInformation";
import useDeleteNote from "../../../../hooks/Notes/useDeleteNote";
import { IoClose } from "react-icons/io5";
import { Puff, ThreeDots } from "react-loader-spinner";
import useUpdateNote from "../../../../hooks/Notes/useUpdateNote";
import Modal from "../../../../ui/Modal/Modal";

interface NotesProps {
  openNote: boolean;
  onClose: () => void;
}

const getTime = (the_date: string) => {
  const date = new Date(the_date);
  const hours = date.getHours();
  const mins = date.getMinutes();

  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
};

const Notes: React.FC<NotesProps> = ({ openNote, onClose }) => {
  const queryParams = new URLSearchParams(location.search);
  const memberId = queryParams.get("id");
  const [value, setValue] = useState<string>("");
  const { mutate, isPending } = useAddNote(memberId ?? "");
  const { data } = useGetMemberDetails();
  const { data: notes, refetch } = useGetNote(memberId ?? "");
  const { mutate: del, isPending: pendingDelete } = useDeleteNote(
    memberId ?? ""
  );

  const [editedComments, setEditedComments] = useState<{
    [key: string]: string;
  }>({});
  const [updateNote, setUpdateNote] = useState<number | null>(null);

  const handleEditComment = (noteId: string, comment: string) => {
    // Update the edited comment for the specific note id
    setEditedComments((prevComments) => ({
      ...prevComments,
      [noteId]: comment,
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      mutate({ note: value });
      refetch();
    }
  };

  const { mutate: mutateNote, isPending: pendingUpdate } = useUpdateNote({
    memberId: memberId ?? "",
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (updateNote !== null && inputRefs.current[updateNote]) {
      inputRefs.current[updateNote]?.focus();
    }
  }, [updateNote]);

  const handleEditClick = (index: number) => {
    if (updateNote === index) {
      // Reset and focus again
      setUpdateNote(null);
      setTimeout(() => setUpdateNote(index), 0);
    } else {
      setUpdateNote(index);
    }
  };

  return (
    <>
      <div
        className={` bg-slate-600 justify-center  ${
          openNote ? "flex" : "hidden"
        }`}
      >
        <div className="absolute bottom-0 top-40 right-10 mb-10 flex justify-between   text-white W-96 flex-col border bg-white px-2">
          <div className="bg-white p-4 w-[600px]">
            <div className="flex justify-between">
              <p className="text-[#141414] font-azoBold text-2xl self-start ">
                Comments
                <span className="font-azo text-xl text-[#434343]">
                  {" "}
                  ({notes ? notes.length : ""}){" "}
                </span>
              </p>
              <IoClose
                className="text-[#141414] text-2xl cursor-pointer"
                onClick={onClose}
              />
            </div>
            {notes &&
              notes.map(
                (
                  note: { comment: string; date: string; id: string },
                  index: number
                ) => (
                  <div className="flex space-x-3 mt-4">
                    <div className="bg-[#D9D9D9] text-[#2A2A2A] h-10 w-10 flex items-center justify-center rounded-full">
                      {data?.member?.first_name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div className="space-y-2 w-full">
                      <div className="flex justify-between text-[#727171] ">
                        <p className="">{data?.member?.first_name}</p>
                        <p>
                          {formatDate(note.date) + " " + getTime(note.date)}
                        </p>
                      </div>
                      <input
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        readOnly={index !== updateNote}
                        // value={note.comment}
                        className="text-[#434343] w-full border border-slate-400 rounded-md outline-none px-3 py-2"
                        value={editedComments[note.id] ?? note.comment} // Use the edited comment if available, otherwise use the original comment
                        onChange={(e) =>
                          handleEditComment(note.id, e.target.value)
                        }
                        onKeyDown={(
                          e: React.KeyboardEvent<HTMLInputElement>
                        ) => {
                          if (e.key === "Enter") {
                            mutateNote({
                              note: editedComments[note.id] ?? note.comment,
                              memberId: memberId ?? "",
                              noteId: note.id,
                            });
                            setUpdateNote(null);
                          }
                        }}
                      />
                      {/* <p className="text-[#434343]">{note.comment}</p> */}
                      <div className="flex justify-end space-x-2">
                        <FiEdit
                          className="text-[#141414] text-2xl cursor-pointer"
                          onClick={() => handleEditClick(index)}
                        />
                        <MdOutlineDelete
                          className="text-[#F24E1E] text-2xl cursor-pointer"
                          onClick={() => {
                            memberId && del({ memberId, noteId: note.id });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>
          <div className="bg-white w-full flex mb-2 items-stretch">
            <input
              type="text"
              value={value}
              className="flex-grow text-black p-2 outline-none shadow-md"
              placeholder="Type your comment here"
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className=" bg-[#17275B] text-white px-3 flex items-center"
              onClick={() => {
                mutate({ note: value });
                refetch();
              }}
              //   onClick={() => console.log(notes)}
            >
              {!isPending ? (
                <BiSend />
              ) : (
                <Puff height="25" width="18" color="#ffffff" />
              )}
            </button>
          </div>
        </div>
      </div>
      {(pendingDelete || pendingUpdate) && (
        <Modal onClose={() => console.log("Do nothing")}>
          <ThreeDots color="black" />
        </Modal>
      )}
    </>
  );
};

export default Notes;
