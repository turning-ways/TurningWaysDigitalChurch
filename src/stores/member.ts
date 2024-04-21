import { create } from "zustand";

interface Member {
  phoneNumber: { MainPhone: string };
  role: string;
  howDidYouHear: string;
  isParentChurch: string;
  churchName: string;
  setPhoneNumber: (phone: { MainPhone: string }) => void;
  setRole: (role: string) => void;
  setHowDidYouHear: (about: string) => void;
  setChurchName: (name: string) => void;
  setIsParentChurch: (value: string) => void;
}

const savedPhoneNumber = localStorage.getItem("phoneNumber");
const phoneNumber = savedPhoneNumber ? JSON.parse(savedPhoneNumber) : "";

const savedRole = localStorage.getItem("role");
const role = savedRole ? JSON.parse(savedRole) : "";

const savedHowDidYouHear = localStorage.getItem("howDidYouHear");
const howDidYouHear = savedHowDidYouHear ? JSON.parse(savedHowDidYouHear) : "";

const savedChurchName = localStorage.getItem("churchName");
const churchName = savedChurchName ? JSON.parse(savedChurchName) : "";

// const savedChurch = localStorage.getItem("church");
// const church = savedChurch ? JSON.parse(savedChurch) : "";

const savedIsParentChurch = localStorage.getItem("isParentChurch");
const isParentChurch = savedIsParentChurch
  ? JSON.parse(savedIsParentChurch)
  : "";

export const useMemberStore = create<Member>()((set, get) => ({
  phoneNumber,
  role,
  howDidYouHear,
  churchName,
  isParentChurch,
  setPhoneNumber: (phone) => {
    {
      set(() => {
        return { phoneNumber: phone };
      });
    }
    localStorage.setItem("phoneNumber", JSON.stringify(get().phoneNumber));
  },
  setRole: (role) => {
    {
      set(() => {
        return { role };
      });
    }
    localStorage.setItem("role", JSON.stringify(get().role));
  },
  setHowDidYouHear: (about) => {
    {
      set(() => {
        return { howDidYouHear: about };
      });
    }
    localStorage.setItem("howDidYouHear", JSON.stringify(get().howDidYouHear));
  },
  setChurchName: (name) => {
    {
      set(() => {
        return { churchName: name };
      });
    }
    localStorage.setItem("churchName", JSON.stringify(get().churchName));
  },
  setIsParentChurch: (isParentChurch) => {
    {
      set(() => {
        return { isParentChurch };
      });
    }
    localStorage.setItem(
      "isParentChurch",
      JSON.stringify(get().isParentChurch)
    );
  },
}));
