import { PhoneInput } from "react-international-phone";

interface PhoneNumberProps {
  value: string;
  setValue: (value: string) => void;
}

const PhoneNumber: React.FC<PhoneNumberProps> = ({ value, setValue }) => {
  return (
    <div className="mb-2">
      <p className="text-[#727272]">
        Phone Number <span className="text-[#61BD74]">*</span>
      </p>

      <PhoneInput
        defaultCountry="ng"
        value={value}
        onChange={setValue}
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
  );
};

export default PhoneNumber;
