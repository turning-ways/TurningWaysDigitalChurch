import { create } from "zustand";

//USER ID
interface PersonalInfo {
  churchId: string;
  setChurchId: (id: string) => void;
}

//email
const savedChurchId = localStorage.getItem("church_id");
const churchId = savedChurchId ? JSON.parse(savedChurchId) : "";

export const useChurchIdStore = create<PersonalInfo>()((set, get) => ({
  churchId,
  setChurchId: (id) => {
    {
      set(() => {
        return { churchId: id };
      });
    }
    localStorage.setItem("church_id", JSON.stringify(get().churchId));
  },
}));
