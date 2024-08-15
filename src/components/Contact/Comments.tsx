import { useEffect, useRef, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { useParams } from "react-router-dom";
import {
  selectSelectedContact,
  removeCommentFromContact,
  updateCommentToContact,
} from "../../slices/contactSlice";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useChurchIdStore } from "../../stores/churchId";
import { BiPencil } from "react-icons/bi";
import { formatTime } from "@/pages/Overview/Membership/Membership Profile/NotesList";

const Comments = () => {
  const { contact_id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const churchId = useChurchIdStore((state) => state.churchId);
  const contact = useSelector(selectSelectedContact);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [updateComment, setUpdateComment] = useState<number | null>(null);

  const [editedComments, setEditedComments] = useState<{
    [key: string]: string;
  }>({});

  const handleEditComment = (noteId: string, comment: string) => {
    setEditedComments((prevComments) => ({
      ...prevComments,
      [noteId]: comment,
    }));
  };

  const handleUpdateComment = (noteId: string, comment: string) => {
    dispatch(
      updateCommentToContact({
        churchId: churchId,
        contactId: contact_id ?? "",
        noteId: noteId,
        note: comment,
      })
    );
  };

  const handleEditClick = (index: number) => {
    if (updateComment === index) {
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

  return (
    <section className="flex flex-col">
      {contact?.notes?.length ?? 0 > 0 ? (
        [...(contact?.notes || [])]?.reverse().map((item, index) => (
          <div className="flex space-x-4 mt-4 items-center" key={item._id}>
            {!item?.member?.profile?.photo ? (
              <div className="bg-[#D9D9D9] text-[#707070] flex justify-center items-center p-3 rounded-full !w-10 !h-10">
                {item?.member?.profile ? (
                  <span>
                    {item.member.profile.firstName?.charAt(0).toUpperCase() +
                      item.member.profile.lastName?.charAt(0).toUpperCase()}
                  </span>
                ) : contact?.photo ? (
                  <img
                    src={contact.photo}
                    alt="profile"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <span>
                    {contact?.firstName?.charAt(0).toUpperCase()}{" "}
                    {contact?.lastName
                      ? contact?.lastName?.charAt(0).toUpperCase()
                      : ""}
                  </span>
                )}
              </div>
            ) : (
              <img
                src={item.member.profile.photo}
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
            )}
            <div className="w-full">
              <div className="text-[#7F7E7E] flex justify-between items-center">
                <p className="text-sm sm:text-base">
                  {item?.member?.profile
                    ? `${item?.member?.profile?.firstName} ${
                        item?.member?.profile?.lastName
                          ? item?.member?.profile?.lastName
                          : ""
                      }`
                    : `${
                        contact?.firstName &&
                        contact?.firstName?.charAt(0)?.toUpperCase() +
                          contact?.firstName?.slice(1)
                      } ${contact?.lastName ? contact?.lastName : ""}`}
                </p>
                <p className="text-xs sm:text-sm">
                  {formatTime(item?.date)}
                  {item?.isEdited && (
                    <span className="text-sm text-primary">{`  edited`}</span>
                  )}
                </p>
              </div>
              <div className="flex justify-between items-center space-x-5">
                <textarea
                  ref={(el) => (inputRefs.current[index] = el)}
                  readOnly={index !== updateComment}
                  className={`text-[#434343] w-full lg:w-full ${
                    index === updateComment &&
                    "border border-slate-400 rounded-md px-3"
                  } outline-none py-2 resize-none`}
                  value={editedComments[item?._id] ?? item.comment}
                  onChange={(e) => handleEditComment(item?._id, e.target.value)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      handleUpdateComment(
                        item?._id,
                        editedComments[item?._id] ?? item.comment
                      );
                      setUpdateComment(null);
                    }
                  }}
                />
                <div className="flex space-x-3 items-center">
                  <BiPencil
                    className="text-gray-600 text-xl cursor-pointer"
                    onClick={() => handleEditClick(index)}
                  />
                  <BsTrash
                    className="text-xl text-red-400 cursor-pointer"
                    onClick={() =>
                      dispatch(
                        removeCommentFromContact({
                          contactId: contact_id ?? "",
                          noteId: item?._id,
                          churchId,
                        })
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">No comments</div>
      )}
    </section>
  );
};

export default Comments;
