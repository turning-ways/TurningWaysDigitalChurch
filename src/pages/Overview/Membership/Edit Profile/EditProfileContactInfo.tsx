import { useState } from "react";
import InformationInput from "./InformationInput";
import { useContactInformationStore } from "../../../../stores/contactInformation";

const EditProfileContactInfo = () => {
  const [emailValue, setEmailValue] = useState<string>("");
  const [phoneNumberValue, setPhoneNumberValue] = useState<string>("");
  const [homeAddressValue, setHomeAddressValue] = useState<string>("");

  const {setContactEmail, setContactAddress, setContactPhone} = useContactInformationStore();


  const information = [
    { name: "Email", set: setContactEmail, value: emailValue, onChange: setEmailValue },
    { name: "Phone Number", set: setContactPhone, value: phoneNumberValue, onChange: setPhoneNumberValue  },
    { name: "Home Address", set: setContactAddress, value: homeAddressValue, onChange: setHomeAddressValue  },
  ];
  return (
    <div className="mt-5">
      {information.map((item) => (
        <InformationInput text={item.name} onChange={(e) => {item.onChange(e.target.value); item.set(e.target.value)}} value={item.value}/>
      ))}
    </div>
  );
};

export default EditProfileContactInfo;
