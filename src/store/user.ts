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
