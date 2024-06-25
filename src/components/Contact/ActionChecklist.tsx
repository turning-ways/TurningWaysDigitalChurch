import { useState } from "react";
import ShowActions from "./ShowActions";
import Heading from "../../pages/Overview/Contacts/Heading";
import { useGetContacts, useUpdateActionItem } from "../../hooks/useContact";
import { useParams } from "react-router-dom";

const ActionChecklist = () => {
  const [showActions, setShowActions] = useState<boolean>(false);
  const contactDetailsQuery = useGetContacts();
  const newActions = contactDetailsQuery.data?.actions ? contactDetailsQuery.data?.actions : [];
  const {contact_id} = useParams();
  const updateActionChecklistQuery = useUpdateActionItem(contact_id??"");
  const handleCheckboxChange = (index: number) => {
    if (newActions[index]) {
      newActions[index].checked = !newActions[index].checked;
      updateActionChecklistQuery.mutate(newActions[index]);
      console.log("dire");
    } else console.log(contactDetailsQuery.data?.actions);
  };

  return (
    <section>
      <Heading text="Action checklist" />
      <ul className="space-y-2">
        {contactDetailsQuery.data &&
          contactDetailsQuery.data.actions &&
          Array.isArray(contactDetailsQuery.data.actions) &&
          contactDetailsQuery.data.actions.length > 0 &&
          contactDetailsQuery.data.actions.map((item: any, index: any) => (
            <li className="flex space-x-2">
              <input
                type="checkbox"
                checked={item?.checked}
                onChange={() => handleCheckboxChange(index)}
              />
              <p>{item.actionLabel}</p>
            </li>
          ))}
        <button
          className="py-1 px-4 rounded-lg border border-[#17275B] text-[#17275B]"
          onClick={() => setShowActions(!showActions)}
        >
          <p>Add an Item</p>
        </button>
      </ul>
      {showActions && (
        <ShowActions onClose={() => setShowActions(!ShowActions)} />
      )}
    </section>
  );
};

export default ActionChecklist;
