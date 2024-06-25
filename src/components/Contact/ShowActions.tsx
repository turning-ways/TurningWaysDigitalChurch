import { useState } from "react";
import { useAddActionItem } from "../../hooks/useContact";
import Modal from "../../ui/Modal/Modal";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { notify } from "../../hooks/useAuthData";

const ShowActions = ({ onClose }: { onClose: () => void }) => {
  const [actionValue, setActionValue] = useState("");
  const { contact_id } = useParams();
  const addActionChecklistQuery = useAddActionItem(onClose, contact_id ?? "");
  return (
    <Modal onClose={onClose}>
      <div
        className={`w-[400px] bg-white px-6 py-6 border rounded-2xl flex flex-col space-y-4`}
      >
        <input
          className="outline-none px-2 py-3 border rounded-lg"
          value={actionValue}
          onChange={(e) => setActionValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (actionValue !== "") {
                addActionChecklistQuery.mutate({
                  action: actionValue,
                  checked: false,
                });
              } else {
                notify("Please enter a value");
              }
            }
          }}
        />
        {/* {action.map((item) => (
              <ul className="text-[#555555]">
                <li
                  className="cursor-pointer hover:text-[#A0D7AC]"
                  onClick={() => addAction({ action: item, checked: false })}
                >
                  {item}
                </li>
              </ul>
            ))} */}
        <div className="flex justify-between">
          <button
            className="w-32 bg-[#F3F3F3] text-[#7A7A7A] hover:text-secondary self-center rounded-[14px] py-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="w-32 bg-[#F3F3F3] text-[#7A7A7A] hover:text-secondary self-center rounded-[14px] py-2 flex justify-center"
            onClick={() => {
              if (actionValue !== "") {
                addActionChecklistQuery.mutate({
                  action: actionValue,
                  checked: false,
                });
                setTimeout(() => setActionValue(""), 5000);
              } else if (actionValue === "") {
                notify("Please enter a value");
              }
            }}
          >
            {!addActionChecklistQuery.isPending ? (
              <p>Add</p>
            ) : (
              <ThreeDots width={24} height={24} color="black" />
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ShowActions;
