// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface userDataProps {
//     profileImage: File | null;
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
//     phone:string // Changed type to File | null
//     gender:string
// }

// interface UserProps {
//   data: userDataProps;
//   addUserData: (data: userDataProps) => void;
// }

// const MAX_QUANTITY = 10; // Define the maximum quantity value

// const userStore = create<UserProps>()(
//   persist(
//     (set) => ({
//       data: [],
//       addUserData: (newItem) => set((state) => {

// console.log('newItem',newItem);
// console.log('state',state);
// // return { data:data }

//       })
//     }),
//     {
//       name: "canteen-cart",
//       getStorage: () => localStorage
//     }
//   )
// );

// export default userStore;



import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserDataProps {
    profileImage: string | null | undefined;
    firstName: string;
    lastName: string;
    email: string;
    phone:string // Changed type to File | null
    gender:string
  }

interface UserStoreProps {
  user: UserDataProps | null ;
  setUser: (userData: UserDataProps) => void;
  clearUser: () => void;
  updateUser: (updatedData: Partial<UserDataProps>) => void;
  // Optionally, add methods for updating user information
}

const useUserStore = create<UserStoreProps>()(
  persist(
    (set) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
      clearUser: () => set({ user: null }),
      updateUser: (updatedData: Partial<UserDataProps>) => set((state) => ({
        user: state.user ? { ...state.user, ...updatedData } : null
      }))
      // Optionally, add methods for updating user information
    }),
    {
      name: "user-data",
      getStorage: () => localStorage, // Persist in localStorage
    }
  )
);

export default useUserStore;
