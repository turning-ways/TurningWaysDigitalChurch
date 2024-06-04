import InformationInput from "./InformationInput";
import { useContactInformationStore } from "../../../../stores/Add Member/contactInformation";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import HeaderTwo from "../../../../components/Heading/HeaderTwo";
import { useNavigate } from "react-router-dom";

const EditProfileContactInfo = () => {
  const {
    setContactEmail,
    setContactAddress,
    setContactPhone,
    contact_address,
    contact_email,
    contact_phone,
  } = useContactInformationStore();

  const information = [
    { name: "Email", set: setContactEmail, value: contact_email },
    // { name: "Phone Number", set: setContactPhone, value: contact_phone },
    { name: "Home Address", set: setContactAddress, value: contact_address },
  ];

  const navigate = useNavigate();
  return (
    <div className="mt-5 flex flex-col">
      {information.map((item) => (
        <InformationInput
          text={item.name}
          onChange={(e) => {
            item.set(e.target.value);
          }}
          value={item.value}
          notCompulsory=" "
        />
      ))}
      <div className="mb-2">
        <HeaderTwo>
          Phone Number <span className="text-[#61BD74]">*</span>
        </HeaderTwo>

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
      <div className="flex justify-between">
        <button
          className=" flex mt-4 bg-[#17275B] text-white px-4 py-2  rounded-lg gap-2 justify-center "
          onClick={() =>
            navigate("/admin/directory/add-member/personal-information")
          }
        >
          <p className="text-lg ">Previous</p>
        </button>
        <button
          className=" flex mt-4 bg-[#17275B] text-white px-4 py-2  rounded-lg gap-2 justify-center "
          onClick={() =>
            navigate("/admin/directory/add-member/church-information")
          }
        >
          {/* <RiAddCircleFill className="text-2xl" /> */}
          <p className="text-lg ">Next</p>
        </button>
      </div>
    </div>
  );
};

export default EditProfileContactInfo;
