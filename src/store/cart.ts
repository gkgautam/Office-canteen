import { create } from "zustand";

interface MenuDataProps {
  _id: string;
  menuItemName: string;
  menuItemCategory: string;
  menuItemDescription: string;
  menuItemPrice: number;
  menuItemImage: string | null; // Changed type to File | null
}

interface CartProps {
  data: MenuDataProps[],
  addItem: (data: MenuDataProps) => void,
  deleteItem: (id: string) => void
}

const useCartStore = create<CartProps>((set) => ({
  data: [],
  addItem: (newItem) => set((state) => {

    const existingIds = new Set(state.data.map(item => item._id));
    const menuItemExistInCart = !existingIds.has(newItem._id);

    return { data: [...state.data, !menuItemExistInCart && newItem] };
  }),
  deleteItem: (id) => set((state) => ({
    data: state.data.filter(item => item._id !== id)
  }))
}));


export default useCartStore;