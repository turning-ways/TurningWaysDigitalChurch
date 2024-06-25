import { create } from "zustand";
import { persist } from "zustand/middleware";

//PRODUCT ID
interface RegisterStore {
  phone_number: string;
  gender: string;
  email: string;
  date_of_birth: string;
  your_role: string;
  hear_about_us: string;
  setRegister: (r: {
    phone_number: string;
    gender: string;
    email: string;
    date_of_birth: string;
    your_role: string;
    hear_about_us: string;
  }) => void;
  reset: () => void;
}

const initialState = {
  phone_number: "",
  gender: "",
  email: "",
  date_of_birth: "",
  your_role: "",
  hear_about_us: "",
};

export const useRegistrationStore = create<
  RegisterStore,
  [["zustand/persist", RegisterStore]]
>(
  persist(
    (set) => ({
      ...initialState,
      setRegister: (r) =>
        set(() => {
            const {phone_number, gender, email, date_of_birth, your_role, hear_about_us} = r
          return { phone_number, gender, email, date_of_birth, your_role, hear_about_us };
        }),
      reset: () => set(initialState),
    }),
    {
      name: "registeration-storage",
      getStorage: () => localStorage,
    }
  )
);
