import InformationInput from "../Edit Profile/InformationInput";
import HeaderTwo from "../../../../ui/Heading/HeaderTwo";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useChurchIdStore } from "../../../../stores/churchId";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  updateMemberDetails,
  updateTempMemberField,
  selectTempMember,
  selectMemberError,
  selectMemberUpdateStatus,
} from "../../../../slices/memberSlice";
import { AppDispatch } from "../../../../store";
import { notify, success } from "../../../../hooks/useAuthData";
import { useEffect, useState } from "react";

const UpdateContactInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const queryParams = new URLSearchParams(location.search);
  const memberId = queryParams.get("id");
  const { churchId } = useChurchIdStore();

  const tempMember = useSelector(selectTempMember);
  const status = useSelector(selectMemberUpdateStatus);
  const error = useSelector(selectMemberError);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const handleInputChange = (
    field: string,
    value: string | number | boolean
  ) => {
    dispatch(updateTempMemberField({ field, value }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    return phone.length > 0; // Simplistic check, customize as needed
  };

  const handleSave = () => {
    let valid = true;

    if (!validateEmail(tempMember?.profile?.email || "")) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError(null);
    }

    if (!validatePhone(tempMember?.profile?.phone.mainPhone || "")) {
      setPhoneError("Invalid phone number");
      valid = false;
    } else {
      setPhoneError(null);
    }

    if (!valid) return;

    const memberData = { ...tempMember, churchId: churchId ?? "" };
    dispatch(
      updateMemberDetails({
        navigate,
        churchId: churchId ?? "",
        memberId: memberId ?? "",
        member: memberData,
      })
    ).then(() => {
      if (status !== "failed") {
        success("Member details updated successfully");
      }
    });
  };

  useEffect(() => {
    if (status === "failed") {
      notify(error || "An error occurred");
    }
  }, [status, error]);

  return (
    <div className="mt-5">
      <InformationInput
        text="Email"
        onChange={(e) => handleInputChange("profile.email", e.target.value)}
        value={tempMember?.profile?.email}
        notCompulsory=" "
        error={emailError ?? undefined}
      />
      <InformationInput
        text="Home Address"
        onChange={(e) =>
          handleInputChange(
            "profile.address.homeAddress",
            e.target.value || " "
          )
        }
        value={
          tempMember?.profile?.address
            ? tempMember?.profile?.address.homeAddress
            : " "
        }
        notCompulsory=" "
      />
      <InformationInput
        text="Work Address"
        onChange={(e) =>
          handleInputChange("profile.address.workAddress", e.target.value)
        }
        value={
          tempMember?.profile?.address
            ? tempMember?.profile?.address.workAddress
            : " "
        }
        notCompulsory=" "
      />

      <div className="mb-2">
        <HeaderTwo>
          Phone Number <span className="text-[#61BD74]">*</span>
        </HeaderTwo>

        <PhoneInput
          defaultCountry="ng"
          value={tempMember?.profile?.phone.mainPhone}
          onChange={(phone) =>
            handleInputChange("profile.phone.mainPhone", phone)
          }
          inputStyle={{
            width: "100%",
            paddingLeft: "10px",
            paddingTop: "24px",
            paddingRight: "10px",
            paddingBottom: "24px",
            borderColor: "#EBEFF9",
            borderRadius: "8px",
            fontSize: "18px",
          }}
          countrySelectorStyleProps={{
            buttonStyle: {
              height: "100%",
              paddingLeft: "10px",
              paddingRight: "10px",
              borderColor: "#EBEFF9",
              borderRadius: "8px",
            },
          }}
        />
        {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
      </div>

      <div className="flex justify-between">
        <div className="flex space-x-3">
          <button
            className="flex mt-4 bg-[#17275B] text-white w-28 py-2 rounded-lg gap-2 justify-center"
            onClick={() =>
              navigate(
                `/admin/directory/update-member/personal-information?id=${memberId}`
              )
            }>
            <p className="text-lg">Previous</p>
          </button>
          <button
            className="flex mt-4 bg-[#17275B] text-white w-28 py-2 rounded-lg gap-2 justify-center"
            onClick={() =>
              navigate(
                `/admin/directory/update-member/church-information?id=${memberId}`
              )
            }>
            <p className="text-lg">Next</p>
          </button>
        </div>
        <button
          className="flex mt-4 bg-[#17275B] text-white px-4 py-2 rounded-lg gap-2 justify-center"
          onClick={handleSave}
          disabled={status === "loading"}>
          {status !== "loading" ? (
            <p className="text-lg">Save</p>
          ) : (
            <ThreeDots height="25" width="50" color="#fff" />
          )}
        </button>
      </div>
    </div>
  );
};

export default UpdateContactInfo;
