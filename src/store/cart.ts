import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MenuDataProps {
  _id: string;
  menuItemName: string;
  menuItemCategory: string;
  menuItemDescription: string;
  menuItemPrice: number;
  menuItemImage: string | null;
}

interface CartProps {
  data: MenuDataProps[];
  addItem: (data: MenuDataProps) => void;
  deleteItem: (id: string) => void;
}

const useCartStore = create<CartProps>()(
  persist(
    (set) => ({
      data: [],
      addItem: (newItem) => set((state) => {
        const existingIds = new Set(state.data.map(item => item._id));
        if (!existingIds.has(newItem._id)) {
          return { data: [...state.data, newItem] };
        }
        return state; // Return the same state if the item already exists
      }),
      deleteItem: (id) => set((state) => ({
        data: state.data.filter(item => item._id !== id)
      }))
    }),
    {
      name: "canteen-cart",
      getStorage: () => localStorage
    }
  )
);

export default useCartStore;
