import { create } from "zustand";

//USER ID
interface UserId {
  userId: string;
  setUserId: (id: string) => void;
}

const savedUserId = localStorage.getItem("userId");
const userId = savedUserId ? JSON.parse(savedUserId) : "";

export const useUserIdStore = create<UserId>()((set, get) => ({
  userId,
  setUserId: (id) => {
    {
      set(() => {
        return { userId: id };
      });
    }
    localStorage.setItem("userId", JSON.stringify(get().userId));
  },
}));

//USER'S FIRST NAME AND LAST NAME
interface UserName {
  //   first_name: string;
  //   last_name: string;
  email: string;
  phone: string;
  //   password: string;
  //   passwordConfirm: string;
  setEmail: (email: string) => void;
  setPhone: (email:string) => void;
}

// const savedFirstName = localStorage.getItem("first_name");
// const first_name = savedFirstName ? JSON.parse(savedFirstName) : "";
// const savedLastName = localStorage.getItem("last_name");
// const last_name = savedLastName ? JSON.parse(savedLastName) : "";
const savedEmail = localStorage.getItem("email");
const email = savedEmail ? JSON.parse(savedEmail) : "";
const savedPhone = localStorage.getItem("phone");
const phone = savedPhone ? JSON.parse(savedPhone) : "";
// const savedPassword = localStorage.getItem("password");
// const password = savedPassword ? JSON.parse(savedPassword) : "";
// const savedPasswordConfirm = localStorage.getItem("passwordConfirm");
// const passwordConfirm = savedPasswordConfirm
//   ? JSON.parse(savedPasswordConfirm)
//   : "";

export const useUserDetailsStore = create<UserName>()((set, get) => ({
  //   first_name,
  //   last_name,
  email,
  phone,

  //   password,
  //   passwordConfirm,
  setEmail: (email) => {
    {
      set(() => {
        return { email };
      });
    }
    localStorage.setItem("email", JSON.stringify(get().email));
    // localStorage.setItem("last_name", JSON.stringify(get().last_name));
    // localStorage.setItem("email", JSON.stringify(get().email));
    // localStorage.setItem("password", JSON.stringify(get().password));
    // localStorage.setItem(
    //   "passwordConfirm",
    //   JSON.stringify(get().passwordConfirm)
    // );
  },
  setPhone: (phone) => {
    {
      set(() => {
        return { phone };
      });
    }
    localStorage.setItem("phone", JSON.stringify(get().phone));
  },
}));

//OTP

interface Token {
  token: string;
  setToken: (token: string) => void;
}

const savedToken = localStorage.getItem("goken");
const token = savedToken ? JSON.parse(savedToken) : "";
export const useTokenStore = create<Token>()((set, get) => ({
  token,

  setToken: (token) => {
    {
      set(() => {
        return { token };
      });
    }
    localStorage.setItem("token", JSON.stringify(get().token));
  },
}));

// USER AUTHENTICATION HANDLE
interface UserAuth {
  user: { first_name: string; last_name: string; churchId: { _id: string; name: string } } | null;
  setUser: (
    user: {
      first_name: string;
      last_name: string;
      churchId: { _id: string; name: string };
    } | null
  ) => void;
}

const savedUser = localStorage.getItem("user");
const user = savedUser ? JSON.parse(savedUser) : null;

export const useUserAuth = create<UserAuth>()((set, get) => ({
  user,
  setUser: (user) => {
    {
      set(() => {
        return { user };
      });
    }
    localStorage.setItem("user", JSON.stringify(get().user));
  },
}));
