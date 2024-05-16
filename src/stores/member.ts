import { create } from "zustand";

interface Member {
  phoneNumber: { MainPhone: string };
  role: string;
  howDidYouHear: string;
  gender:string;
  email:string;
  dateOfBirth: string;
  isParentChurch: string;
  churchName: string;
  setPhoneNumber: (phone: { MainPhone: string }) => void;
  setRole: (role: string) => void;
  setHowDidYouHear: (about: string) => void;
  setChurchName: (name: string) => void;
  setIsParentChurch: (value: string) => void;
  setGender: (value: string) => void;
  setDateOfBirth: (value: string) => void;
  setEmail: (value: string) => void;
}

const savedPhoneNumber = localStorage.getItem("phoneNumber");
const phoneNumber = savedPhoneNumber ? JSON.parse(savedPhoneNumber) : "";

const savedRole = localStorage.getItem("role");
const role = savedRole ? JSON.parse(savedRole) : "";

const savedHowDidYouHear = localStorage.getItem("howDidYouHear");
const howDidYouHear = savedHowDidYouHear ? JSON.parse(savedHowDidYouHear) : "";

const savedChurchName = localStorage.getItem("churchName");
const churchName = savedChurchName ? JSON.parse(savedChurchName) : "";

const savedGender = localStorage.getItem("member_gender");
const gender = savedGender ? JSON.parse(savedGender) : "";

const savedEmail = localStorage.getItem("member_email");
const email = savedEmail ? JSON.parse(savedEmail) : "";

const savedDateOfBirth = localStorage.getItem("date_of_birth");
const dateOfBirth = savedDateOfBirth ? JSON.parse(savedDateOfBirth) : "";

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
  gender,
  email,
  dateOfBirth,
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
  setGender: (gender) => {
    {
      set(() => {
        return { gender };
      });
    }
    localStorage.setItem(
      "member_gender",
      JSON.stringify(get().gender)
    );
  },
  setEmail: (email) => {
    {
      set(() => {
        return { email };
      });
    }
    localStorage.setItem(
      "member_email",
      JSON.stringify(get().email)
    );
  },
  setDateOfBirth: (dateOfBirth) => {
    {
      set(() => {
        return { dateOfBirth };
      });
    }
    localStorage.setItem(
      "date_of_birth",
      JSON.stringify(get().dateOfBirth)
    );
  },
}));
