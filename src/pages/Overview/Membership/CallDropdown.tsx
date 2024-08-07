import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/DropDownMenu/DropDown";
import { useSelector } from "react-redux";
import { IoCallOutline } from "react-icons/io5";
import { RootState } from "@/rootReducer";

const CallDropdown = () => {
  const { member } = useSelector((state: RootState) => state.members);

  //   A Dropdown for different call options like Call, Video Call, Voice Call
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <li className="flex items-center space-x-1 cursor-pointer">
          <IoCallOutline className="text-xl" />
          <p>Call</p>
        </li>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-white">
        <DropdownMenuLabel>Call Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={
            member?.profile?.phone?.mainPhone === "" ||
            member?.profile?.phone?.mainPhone === "+234" ||
            member?.profile?.phone?.mainPhone === "+234" ||
            member?.profile?.phone?.mainPhone === "+234-"
          }>
          <a href={`tel:${member?.profile?.phone?.mainPhone}`}>Direct Call</a>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>Voice Call</DropdownMenuItem>
        <DropdownMenuItem disabled>Video Call</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CallDropdown;
