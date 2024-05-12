import InformationInput from "../Edit Profile/InformationInput";
import { useEditContactInformationStore } from "../../../../stores/Edit Member/contactinfo";
import useGetMemberDetails from "../../../../hooks/Member/useGetMemberDetails";
import { useEffect } from "react";
import HeaderTwo from "../../../../components/Heading/HeaderTwo";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

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
    { name: "Home Address", set: setContactAddress, value: contact_address },
  ];

  const { data } = useGetMemberDetails();

  useEffect(() => {
    setContactEmail(data ? data?.member?.email : "");
    setContactAddress(data ? data?.member?.address?.HomeAddress : "");
    setContactPhone(data ? data?.member?.phone?.MainPhone : "");
  }, []);

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
      <div className="mb-2">
        <HeaderTwo>Phone Number <span className="text-[#61BD74]">*</span></HeaderTwo>

        <PhoneInput
          defaultCountry="ng"
          value={contact_phone}
          onChange={(phone) => setContactPhone(phone)}
          inputStyle={{
            width: "100%",
            paddingLeft: "10px",
            paddingTop: "24px",
            paddingRight: "10px",
            paddingBottom: "24px",
            // backgroundColor: "#F7FAFC",
            borderColor: "#EBEFF9",
            borderStartEndRadius: "8px",
            borderEndEndRadius: "8px",
            fontSize: "18px",
          }}
          countrySelectorStyleProps={{
            buttonStyle: {
              height: "100%",
              paddingLeft: "10px",
              paddingRight: "10px",
              // backgroundColor: "#F7FAFC",
              borderColor: "#EBEFF9",
              borderEndStartRadius: "8px",
              borderStartStartRadius: "8px",
            },
          }}
        />
      </div>

    </div>
  );
};

export default UpdateContactInfo;
