// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// //PRODUCT ID
// interface Member {
//   prefix: string;
//   first_name: string;
//   middle_name: string;
//   last_name: string;
//   suffix: string;
//   gender: string;
//   dateOfBirth: string;
//   anniversary: string;
//   setPrefix: (prefix: string) => void;
//   setFirstName: (first_name: string) => void;
//   setMiddleName: (middle_name: string) => void;
//   setLastName: (last_name: string) => void;
//   setSuffix: (suffix: string) => void;
//   setGender: (gender: string) => void;
//   setDateOfBirth: (dob: string) => void;
//   setAnniversary: (anniversary: string) => void;
//   reset: () => void;
// }

// const initialState = {
//     prefix: "",
//     first_name: "",
//     middle_name: "",
//     last_name: "",
//     suffix: "",
//     gender: "",
//     dateOfBirth: "",
//     anniversary: "",
// };

// export const useAddMemberStore = create<
//   Member,
//   [["zustand/persist", Member]]
// >(
//   persist(
//     (set) => ({
//       ...initialState,
//       // setClientSecret: (client_secret) => set(() => ({ client_secret })),
//       setAuthToken: (auth_token) => set(() => ({ auth_token })),
//       reset: () => set(initialState),
//     }),
//     {
//       name: "client-storage",
//       getStorage: () => localStorage,
//     }
//   )
// );
