import InformationInput from "./InformationInput";
import { useContactInformationStore } from "../../../../stores/contactInformation";

const EditProfileContactInfo = () => {

  const {setContactEmail, setContactAddress, setContactPhone, contact_address, contact_email, contact_phone} = useContactInformationStore();


  const information = [
    { name: "Email", set: setContactEmail, value: contact_email },
    { name: "Phone Number", set: setContactPhone, value: contact_phone  },
    { name: "Home Address", set: setContactAddress, value: contact_address  },
  ];
  return (
    <div className="mt-5">
      {information.map((item) => (
        <InformationInput text={item.name} onChange={(e) => {item.set(e.target.value)}} value={item.value}/>
      ))}
    </div>
  );
};

export default EditProfileContactInfo;
