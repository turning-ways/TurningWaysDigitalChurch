import { create } from "zustand";

//USER ID
interface PersonalInfo {
  prefix: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: string;
  gender: string;
  setPrefix: (prefix: string) => void;
  setFirstName: (first_name: string) => void;
  setMiddleName: (middle_name: string) => void;
  setLastName: (last_name: string) => void;
  setSuffix: (suffix: string) => void;
  setGender: (gender: string) => void;
}

//prefix
const savedPrefix = localStorage.getItem("edit_prefix");
const prefix = savedPrefix ? JSON.parse(savedPrefix) : "";
//first name
const savedFirstName = localStorage.getItem("edit_first_name");
const first_name = savedFirstName ? JSON.parse(savedFirstName) : "";
//middle name
const savedMiddleName = localStorage.getItem("edit_middle_name");
const middle_name = savedMiddleName ? JSON.parse(savedMiddleName) : "";
//last name
const savedLastName = localStorage.getItem("edit_last_name");
const last_name = savedLastName ? JSON.parse(savedLastName) : "";
//suffix
const savedSuffix = localStorage.getItem("edit_suffix");
const suffix = savedSuffix ? JSON.parse(savedSuffix) : "";
//gender
const savedGender = localStorage.getItem("edit_gender");
const gender = savedGender ? JSON.parse(savedGender) : "";

export const useEditPersonalInformationStore = create<PersonalInfo>()(
  (set, get) => ({
    prefix,
    first_name,
    middle_name,
    last_name,
    suffix,
    gender,
    setPrefix: (prefix) => {
      {
        set(() => {
          return { prefix };
        });
      }
      localStorage.setItem("edit_prefix", JSON.stringify(get().prefix));
    },
    setFirstName: (first_name) => {
      {
        set(() => {
          return { first_name };
        });
      }
      localStorage.setItem("edit_first_name", JSON.stringify(get().first_name));
    },
    setMiddleName: (middle_name) => {
      {
        set(() => {
          return { middle_name };
        });
      }
      localStorage.setItem("edit_middle_name", JSON.stringify(get().middle_name));
    },
    setLastName: (last_name) => {
      {
        set(() => {
          return { last_name };
        });
      }
      localStorage.setItem("edit_last_name", JSON.stringify(get().last_name));
    },
    setSuffix: (suffix) => {
      {
        set(() => {
          return { suffix };
        });
      }
      localStorage.setItem("edit_suffix", JSON.stringify(get().suffix));
    },
    setGender: (gender) => {
      {
        set(() => {
          return { gender: gender.toLowerCase() };
        });
      }
      localStorage.setItem("edit_gender", JSON.stringify(get().gender));
    },
  })
);
