import { create } from "zustand";
import { persist } from "zustand/middleware";
import { checkSession } from "@/actions/users/checkSession";

interface UserDataProps {
  profileImage: string | null | undefined;
  firstName: string;
  lastName: string;
  email: string;
  phone: string // Changed type to File | null
  gender: string
}

interface UserStoreProps {
  user: UserDataProps | null;
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

const useSession = create((state) => ({
  isLoggedIn: false,
  isLoading: true,
  checkUserSession: async () => {
    try {
      const getSession = await checkSession();

      if (getSession.success) {
        state({ isLoggedIn: true, isLoading: false, session: getSession.session })
      }
      else {
        state({ isLoggedIn: false, isLoading: true })
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }
}));

export { useUserStore, useSession };
