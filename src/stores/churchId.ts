// import { create } from "zustand";

// //USER ID
// interface PersonalInfo {
//   churchId: string | null;
//   setChurchId: (id: string) => void;
// }

// //email
// const savedChurchId = localStorage.getItem("church_id");
// const churchId = savedChurchId ? JSON.parse(savedChurchId) : null

// export const useChurchIdStore = create<PersonalInfo>()((set, get) => ({
//   churchId,
//   setChurchId: (id) => {
//     {
//       set(() => {
//         return { churchId: id };
//       });
//     }
//     localStorage.setItem("church_id", JSON.stringify(get().churchId));
//   },
// }));


import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdminStore {
	churchId: string;
	setChurchId: (id: string) => void;
	reset: () => void;
}

const initialState = {
	churchId: "",
};

export const useChurchIdStore = create<AdminStore, [["zustand/persist", AdminStore]]>(
	persist(
		(set) => ({
			...initialState,
			setChurchId: (churchId) => set(() => ({ churchId })),
			reset: () => set(initialState),
		}),
		{
			name: "church-id-storage",
			getStorage: () => localStorage,
		}
	)
);
