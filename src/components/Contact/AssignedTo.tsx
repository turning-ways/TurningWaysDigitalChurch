import { IoIosAddCircle } from "react-icons/io"
import Heading from "../../pages/Overview/Contacts/Heading"
import { useState } from "react"
import { useGetContacts } from "../../hooks/useContact"
import ShowAssignedTo from "./ShowAssignedTo"

const AssignedTo = () => {
    const [showMembers, setShowMembers] = useState(false)
  const contactDetailsQuery = useGetContacts();

  return (
    <section>
        <Heading text="Assigned To" />
      <div className="flex space-x-3">
        <IoIosAddCircle
          className="text-5xl text-[#444343] cursor-pointer"
          onClick={() => setShowMembers(!showMembers)}
        />
        {contactDetailsQuery.data &&
          contactDetailsQuery.data.assignedTo &&
          contactDetailsQuery.data.assignedTo.length > 0 &&
          contactDetailsQuery.data.assignedTo.map((item: any) => (
            <div className="bg-[#7F7E7E] text-white rounded-full h-full w-12 flex items-center justify-center">
              {item.first_name.charAt(0).toUpperCase() +
                item.last_name.charAt(0).toUpperCase()}
            </div>
          ))}
        {showMembers && <ShowAssignedTo onClose={() => setShowMembers(!showMembers)}/>}
      </div>
    </section>
  )
}

export default AssignedTo