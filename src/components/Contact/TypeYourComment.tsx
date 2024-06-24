import { useState } from 'react';
import Heading from '../../pages/Overview/Contacts/Heading';
import { useAddContactComment } from '../../hooks/useContact';
import { BiSend } from 'react-icons/bi';
import { Puff } from 'react-loader-spinner';
import { useUserAuth } from '../../stores/user';

const TypeYourComment = () => {
    const [comment, setComment] = useState("");
    const userId = useUserAuth((auth) => auth.user?._id)
    const addCommentQuery =
    useAddContactComment(() => setComment(""));
  return (
    <section>
        <Heading text="Comments" />
      <div className="bg-white w-full flex mb-2 items-stretch">
        <input
          type="text"
          className="flex-grow text-black p-2 outline-none shadow-md"
          style={{ boxShadow: "0px 0px 4px 0px #00000040" }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your comment here"
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter")
              addCommentQuery.mutate({ note: comment, recordedBy: userId });
          }}
        />
        <button
          className=" bg-[#17275B] text-white px-3 flex items-center"
          onClick={(e) => {
            e.preventDefault();
            addCommentQuery.mutate({ note: comment, recordedBy: userId });
          }}
        >
          {!addCommentQuery.isPending ? (
            <BiSend />
          ) : (
            <Puff height="25" width="18" color="#ffffff" />
          )}
        </button>
      </div>

    </section>
  )
}

export default TypeYourComment