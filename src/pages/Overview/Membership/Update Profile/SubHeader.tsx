import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { LuCamera } from "react-icons/lu";
import { useRef } from "react";
import useGetMemberDetails from "../../../../hooks/Member/member-service/useGetMemberDetails";

const SubHeader = () => {
  const navigate = useNavigate();

  const { data, refetch } = useGetMemberDetails();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const queryParams = new URLSearchParams(location.search);

  const memberId = queryParams.get("id");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch(
          `https://digital-church.onrender.com/api/v1/members/upload/${memberId}`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          console.log(response);
          refetch(); //  Assuming the server returns the URL of the uploaded image
        } else {
          console.error("Failed to upload image:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex justify-center flex-col mt-10 items-center relative">
      <div
        className="bg-[#F1F0F3] rounded-lg p-2 w-fit cursor-pointer h-fit absolute top-0 left-0"
        onClick={() =>
          navigate(
            `/admin/directory/member/personal-information?id=${memberId}`
          )
        }
      >
        <IoIosArrowBack className=" text-2xl w-auto text-[#6C6C6D]" />
      </div>
      <div className="relative">
        {data?.member.photo ? (
          <img
            src={data.member.photo}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
        ) : (
          <div className="border border-black w-32 h-32 rounded-full mb-5 flex justify-center items-center text-5xl">
            P
          </div>
        )}
        <button
          onClick={handleIconClick}
          className="mt-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300 absolute bottom-0 right-0"
        >
          <LuCamera className="text-xl" />
        </button>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default SubHeader;
