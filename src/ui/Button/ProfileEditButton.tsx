// import { RiAddCircleFill } from "react-icons/ri";

interface ButtonProp {
  text: string;
  onPress: () => void;
}

const ProfileEditButton: React.FC<ButtonProp> = ({ text, onPress }) => {
  return (
    <div className="sticky bottom-0 right-0 flex justify-center">
      <button
        className=" flex items-center bg-[#17275B] text-white p-4 w-[315px] rounded-lg gap-2 justify-center"
        onClick={onPress}
      >
        {/* <RiAddCircleFill className="text-2xl" /> */}
        <p className="text-lg ">{text}</p>
      </button>
    </div>
  );
};

export default ProfileEditButton;
