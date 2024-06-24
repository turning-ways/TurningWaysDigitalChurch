import { useState } from 'react'
import { useAddActionItem } from '../../hooks/useContact';
import Modal from '../../ui/Modal/Modal';

const ShowActions = ({onClose}: {onClose: () => void}) => {
    const [actionValue, setActionValue] = useState("")
    const addActionChecklistQuery = useAddActionItem(onClose);
  return (
    <Modal onClose={onClose}>
          <div
            className={`w-[400px] bg-white px-6 py-6 border rounded-2xl flex flex-col space-y-4`}
          >
            <input
              className="outline-none px-2 py-3 border rounded-lg"
              value={actionValue}
              onChange={(e) => setActionValue(e.target.value)}
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
                className="w-32 bg-[#F3F3F3] text-[#7A7A7A] hover:text-secondary self-center rounded-[14px] py-2"
                onClick={() => {
                  addActionChecklistQuery.mutate({ action: actionValue, checked: false });
                  setTimeout(() => setActionValue(""), 5000);
                }}
              >
                Add
              </button>
            </div>
          </div>
        </Modal>
  )
}

export default ShowActions