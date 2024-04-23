import InformationInput from "../Edit Profile/InformationInput";
import { useEditContactInformationStore } from "../../../../stores/Edit Member/contactinfo";
import useGetMemberDetails from "../../../../hooks/Member/useGetMemberDetails";
import { useEffect } from "react";

const UpdateContactInfo = () => {
  const {
    setContactEmail,
    setContactAddress,
    setContactPhone,
    contact_address,
    contact_email,
    contact_phone,
  } = useEditContactInformationStore();

  const information = [
    { name: "Email", set: setContactEmail, value: contact_email },
    { name: "Phone Number", set: setContactPhone, value: contact_phone },
    { name: "Home Address", set: setContactAddress, value: contact_address },
  ];

  const { data } = useGetMemberDetails();

  useEffect(() => {
    setContactEmail(data ? data.member.email : "");
    setContactAddress(data ? data.member.address.HomeAddress : "");
    setContactPhone(data ? data.member.phone.MainPhone : "");
    console.log(data);
  }, [data]);

  return (
    <div className="mt-5">
      {information.map((item) => (
        <InformationInput
          text={item.name}
          onChange={(e) => {
            item.set(e.target.value);
          }}
          value={item.value}
        />
      ))}
    </div>
  );
};

export default UpdateContactInfo;
