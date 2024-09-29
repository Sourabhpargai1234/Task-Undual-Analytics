import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  title: string;
  description: string,
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  quantity: number;
}

// Initial state
const initialState: CartState = {
  items: [],
  quantity: 0
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
        console.log("I am at cartSlice");
        console.log("Items in cart before addition:", JSON.parse(JSON.stringify(state.items))); 
        console.log("Received payload:", action.payload);
    
        const existingItem = state.items.find(
            (item) => item.id === action.payload.id
        );
    
        if (existingItem) {
            existingItem.quantity += 1; 
        } else {
            state.items.push({ ...action.payload, quantity: 1 });
        }
    
        console.log("Items in cart after addition:", JSON.parse(JSON.stringify(state.items)));
    }    
    ,       
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
