import { useEffect, useRef, useState } from "react";
import {
  useDeleteContactComment,
  useGetContacts,
  useUpdateContactComment,
} from "../../hooks/useContact";
import { formatTheDate } from "../../pages/Overview/Contacts/formatDate";
import { useUserAuth } from "../../stores/user";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { useParams } from "react-router-dom";

const Comments = () => {
  const {contact_id} = useParams();
  const contactDetailsQuery = useGetContacts();
  const updateCommentQuery = useUpdateContactComment(contact_id??"");
  const deleteCommentQuery = useDeleteContactComment();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [updateComment, setUpdateComment] = useState<number | null>(null);

  const [editedComments, setEditedComments] = useState<{
    [key: string]: string;
  }>({});

  const handleEditComment = (noteId: string, comment: string) => {
    // Update the edited comment for the specific note id
    setEditedComments((prevComments) => ({
      ...prevComments,
      [noteId]: comment,
    }));
  };

  const handleEditClick = (index: number) => {
    if (updateComment === index) {
      // Reset and focus again
      setUpdateComment(null);
      setTimeout(() => setUpdateComment(index), 0);
    } else {
      setUpdateComment(index);
    }
  };

  useEffect(() => {
    if (updateComment !== null && inputRefs.current[updateComment]) {
      inputRefs.current[updateComment]?.focus();
    }
  }, [updateComment]);

  const userId = useUserAuth((auth) => auth.user?._id);

  return (
    <section>
      {Array.isArray(contactDetailsQuery.data?.notes) &&
      contactDetailsQuery.data.notes.length > 0 ? (
        [...contactDetailsQuery.data.notes].reverse().map((item, index) => (
          <div className="flex w-full space-x-4 mt-4" key={item._id}>
            <div className="bg-[#D9D9D9] text-[#707070] flex justify-center items-center p-3 rounded-full w-10 h-10">
              {contactDetailsQuery.data?.firstName.charAt(0).toUpperCase() +
                contactDetailsQuery.data?.lastName.charAt(0).toUpperCase()}
            </div>
            <div className="w-full">
              <div className="text-[#7F7E7E] flex justify-between items-center">
                <p className="text-sm sm:text-base">
                {/* {item.recordedBy?.first_name +
                    " " +
                    item.recordedBy?.last_name} */}
                {contactDetailsQuery.data?.firstName + " " +
                contactDetailsQuery.data?.lastName}
                </p>
                <p className="text-xs sm:text-sm">{formatTheDate(item.date)}</p>
              </div>
              <div className="flex justify-between items-center">
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  readOnly={index !== updateComment}
                  // value={note.comment}
                  className={`text-[#434343] w-[500px] ${
                    index === updateComment &&
                    "border border-slate-400 rounded-md px-3"
                  } outline-none  py-2`}
                  value={editedComments[item._id] ?? item.note} // Use the edited comment if available, otherwise use the original comment
                  onChange={(e) => handleEditComment(item._id, e.target.value)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                      updateCommentQuery.mutate({
                        note: editedComments[item._id] ?? item.note,
                        noteId: item._id,
                        recordedBy: userId ?? "",
                      });
                      setUpdateComment(null);
                    }
                  }}
                />
                <div className="flex space-x-3 items-center">
                  <FiEdit
                    className="text-[#141414] text-xl cursor-pointer"
                    onClick={() => handleEditClick(index)}
                  />
                  <MdOutlineDelete
                    className="text-2xl text-red-500 cursor-pointer"
                    onClick={() =>
                      deleteCommentQuery.mutate({
                        contactId: contactDetailsQuery.data._id ?? "",
                        memberId: userId,
                        commentId: item._id,
                        churchId: contactDetailsQuery.data.church.id ?? "",
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No comments</p>
      )}
    </section>
  );
};

export default Comments;
