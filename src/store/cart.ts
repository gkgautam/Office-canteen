import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MenuDataProps {
  _id: string;
  menuItemName: string;
  menuItemCategory: string;
  menuItemDescription: string;
  menuItemPrice: number;
  menuItemImage: string | null;
  quantity: number | 1; // Ensure quantity is a number
}

interface CartProps {
  data: MenuDataProps[];
  addItem: (data: MenuDataProps) => void;
  deleteItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  setOrderItemId: (id: string |null ) => void; // Method to set the single item ID for the order
  orderItemId: string | null; // Single item ID for the order
}

const MAX_QUANTITY = 10; // Define the maximum quantity value

const useCartStore = create<CartProps>()(
  persist(
    (set) => ({
      data: [],
      orderItemId: null,
      addItem: (newItem) => set((state) => {

        const existingItemIndex = state.data.findIndex(item => item._id === newItem._id);

        if (existingItemIndex !== -1) {
          // Item exists, update its quantity
          const updatedData = state.data.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: Math.min(item.quantity + newItem.quantity, MAX_QUANTITY) }
              : item
          )

          return { data: updatedData };
        } else {
          // New item, add to cart
          const updatedData = [...state.data, { ...newItem, quantity: 1 }];

          return { data: updatedData };
        }
      }),
      deleteItem: (id) => set((state) => {
        const updatedData = state.data.filter(item => item._id !== id);
        return { data: updatedData };
      }),
      increaseQuantity: (id) => set((state) => {
        const updatedData = state.data.map(item =>
          item._id === id
            ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY) }
            : item
        );
        return { data: updatedData };
      }),
      decreaseQuantity: (id) => set((state) => {
        const updatedData = state.data.map(item =>
          item._id === id
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) } // Ensure quantity does not go below 1
            : item
        );
        return { data: updatedData };
      }),
      setOrderItemId: (id) => set({ orderItemId: id })
    }),
    {
      name: "canteen-cart",
      getStorage: () => localStorage
    }
  )
);

export default useCartStore;
