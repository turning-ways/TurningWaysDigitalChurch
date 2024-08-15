import Heading from "../../pages/Overview/Contacts/Heading";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useChurchIdStore } from "../../stores/churchId";
import {
  addActionToContact,
  removeActionFromContact,
  updateActionToContact,
  selectSelectedContact,
} from "../../slices/contactSlice";
import { BsTrash } from "react-icons/bs";

const ActionChecklist = () => {
  // const [showActions, setShowActions] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const churchId = useChurchIdStore((state) => state.churchId);
  const contact = useSelector(selectSelectedContact);
  const { contact_id } = useParams();
  const safeContactId = contact_id ?? "";

  const handleAction = (id: string) => {
    dispatch(
      removeActionFromContact({
        churchId,
        contactId: safeContactId,
        actionId: id,
      })
    );
  };

  const handleActionUpdate = (id: string) => {
    dispatch(
      updateActionToContact({
        churchId,
        contactId: safeContactId,
        actionId: id,
      })
    );
  };

  return (
    <section>
      <Heading text="Action checklist" />
      {contact?.action &&
        contact?.action.map((action) => (
          <div
            className="flex items-center p-1 w-80 justify-between hover:bg-gray-100 group focus:bg-gray-100"
            key={action.id}>
            <div className="flex items-center">
              <input
                type="checkbox"
                id={action.id}
                name={action.id}
                checked={action.completed}
                onChange={() => handleActionUpdate(action.id)}
              />
              <label htmlFor={action.id} className="ml-2">
                {action.name}
              </label>
            </div>
            <BsTrash
              className="cursor-pointer text-gray-500 hidden group-hover:block"
              onClick={() => handleAction(action.id)}
            />
          </div>
        ))}
      {/* Add a new action */}
      <div className="flex gap-2 items-center mt-3">
        <input type="checkbox" className="w-4 h-4" disabled />
        <input
          type="text"
          placeholder="Add a new action"
          className="focus:border-b border-primary w-full focus:bg-gray-100 caret-primary max-w-56 rounded-t-md px-1 py-1 focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              dispatch(
                addActionToContact({
                  churchId,
                  contactId: safeContactId,
                  action: {
                    name: e.currentTarget.value,
                  },
                })
              );
              e.currentTarget.value = "";
            }
          }}
        />
      </div>
    </section>
  );
};

export default ActionChecklist;
