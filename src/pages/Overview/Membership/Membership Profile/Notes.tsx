import { BiSend } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import useAddNote from "../../../../hooks/Notes/useAddNote";
import useGetMemberDetails from "../../../../hooks/Member/useGetMemberDetails";
import useGetNote from "../../../../hooks/Notes/useGetNote";
import { useState } from "react";
import { formatDate } from "./PersonalInformation";
import useDeleteNote from "../../../../hooks/Notes/useDeleteNote";
import { IoClose } from "react-icons/io5";

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
  const { mutate } = useAddNote(memberId ?? "");
  const { data } = useGetMemberDetails();
  const { data: notes, refetch } = useGetNote(memberId ?? "");
  const { mutate: del } = useDeleteNote(memberId ?? "");

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

  return (
    <>
      <div
        className={` bg-slate-600 justify-center  ${
          openNote ? "flex" : "hidden"
        }`}
      >
        <div className="absolute bottom-0 mb-10 flex items-center  text-white W-96 flex-col border bg-white px-2">
          <div className="bg-white p-4 w-[800px]">
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
                        type="text"
                        readOnly={index !== updateNote}
                        // value={note.comment}
                        className="text-[#434343] w-full outline-none"
                        value={editedComments[note.id] ?? note.comment} // Use the edited comment if available, otherwise use the original comment
                        onChange={(e) =>
                          handleEditComment(note.id, e.target.value)
                        }
                      />
                      {/* <p className="text-[#434343]">{note.comment}</p> */}
                      <div className="flex justify-end space-x-2">
                        <FiEdit
                          className="text-[#141414] text-2xl"
                          onClick={() => {
                            console.log(updateNote);
                            setUpdateNote(index);
                          }}
                        />
                        <MdOutlineDelete
                          className="text-[#F24E1E] text-2xl"
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
            />
            <button
              className=" bg-[#17275B] text-white px-3 flex items-center"
              onClick={() => {
                mutate({ note: value });
                refetch();
              }}
              //   onClick={() => console.log(notes)}
            >
              <BiSend />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notes;
