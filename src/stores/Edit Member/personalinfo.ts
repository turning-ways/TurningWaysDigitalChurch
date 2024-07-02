import { create } from "zustand";

//USER ID
interface PersonalInfo {
  prefix: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: string;
  gender: string;
  dateOfBirth: string;
  anniversary: string;
  educational_level: string;
  employment_status: string;
  health_status: string;
  setPrefix: (prefix: string) => void;
  setFirstName: (first_name: string) => void;
  setMiddleName: (middle_name: string) => void;
  setLastName: (last_name: string) => void;
  setSuffix: (suffix: string) => void;
  setGender: (gender: string) => void;
  setDateOfBirth: (dob: string) => void;
  setAnniversary: (anniversary: string) => void;
  setEducationalLevel: (s: string) => void;
  setEmploymentStatus: (s: string) => void;
  setHealthStatus: (s: string) => void;
}

//prefix
const savedPrefix = localStorage.getItem("edit_prefix");
const prefix = savedPrefix && savedPrefix !== "undefined" ? JSON.parse(savedPrefix) : "";
//first name
const savedFirstName = localStorage.getItem("edit_first_name");
const first_name = savedFirstName && savedFirstName !== "undefined" ? JSON.parse(savedFirstName) : "";
//middle name
const savedMiddleName = localStorage.getItem("edit_middle_name");
const middle_name = savedMiddleName && savedMiddleName !== "undefined" ? JSON.parse(savedMiddleName) : "";
//last name
const savedLastName = localStorage.getItem("edit_last_name");
const last_name = savedLastName && savedLastName !== "undefined" ? JSON.parse(savedLastName) : "";
//suffix
const savedSuffix = localStorage.getItem("edit_suffix");
const suffix = savedSuffix && savedSuffix !== "undefined" ? JSON.parse(savedSuffix) : "";
//gender
const savedGender = localStorage.getItem("edit_gender");
const gender = savedGender && savedGender !== "undefined" ? JSON.parse(savedGender) : "";
//dateOfBirth
const savedDateOfBirth = localStorage.getItem("dateOfBirth");
const dateOfBirth = savedDateOfBirth && savedDateOfBirth !== "undefined" ? JSON.parse(savedDateOfBirth) : "";
//anniversary
const savedAnniversary = localStorage.getItem("anniversary");
const anniversary = savedAnniversary && savedAnniversary !== "undefined" ? JSON.parse(savedAnniversary) : "";
//educational level
const savedEducationalLevel = localStorage.getItem("educationalLevel");
const educational_level = savedEducationalLevel && savedEducationalLevel !== "undefined" ? JSON.parse(savedEducationalLevel) : "undefined";
//employment status
const savedEmploymentStatus = localStorage.getItem("employmentStatus");
const employment_status = savedEmploymentStatus && savedEmploymentStatus !== "undefined" ? JSON.parse(savedEmploymentStatus) : "undefined";
//health status
const savedHealthStatus = localStorage.getItem("healthStatus");
const health_status = savedHealthStatus && savedHealthStatus !== "undefined" ? JSON.parse(savedHealthStatus) : "undefined";

export const useEditPersonalInformationStore = create<PersonalInfo>()(
  (set, get) => ({
    prefix,
    first_name,
    middle_name,
    last_name,
    suffix,
    gender,
    dateOfBirth,
    anniversary,
    educational_level,
    employment_status,
    health_status,
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
    setDateOfBirth: (dob) => {
      { set(() => {
         return {dateOfBirth: dob}
       })}
       localStorage.setItem("dateOfBirth", JSON.stringify(get().dateOfBirth));
     },
     setAnniversary: (anniversary) => {
      { set(() => {
         return {anniversary}
       })}
       localStorage.setItem("anniversary", JSON.stringify(get().anniversary));
     },
     setEducationalLevel: (educational_level) => {
      {
        set(() => {
          return { educational_level };
        });
      }
      localStorage.setItem("educationalLevel", JSON.stringify(get().educational_level));
    },
    setEmploymentStatus: (employment_status) => {
      {
        set(() => {
          return { employment_status };
        });
      }
      localStorage.setItem("employmentStatus", JSON.stringify(get().employment_status));
    },
    setHealthStatus: (health_status) => {
      {
        set(() => {
          return { health_status };
        });
      }
      localStorage.setItem("healthStatus", JSON.stringify(get().health_status));
    },
  })
);
