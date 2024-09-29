"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/store";
import { removeItemFromCart, clearCart } from "../Redux/cartSlice";

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false); 
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeItemFromCart(id));
  };

  const handleClose = () => setIsOpen(false); 

  return (
    <div>
      <button
        className="bg-green-500 text-white p-2 rounded-lg mt-4"
        onClick={() => setIsOpen(true)}
      >
        View Cart
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
            <h1 className="text-center text-black font-bold text-3xl my-4">Your Cart</h1>
            <button
              className="absolute top-2 right-2 text-gray-600 text-xl font-bold"
              onClick={handleClose}
            >
              &times;
            </button>

            {cartItems.length > 0 ? (
              cartItems.map((item: any) => (
                <div key={item.id} className="bg-gray-100 p-4 mb-4">
                  <h1 className="text-black">{item.title}</h1>
                  <p className="text-blue-800">{item.description}</p>
                  <p className="text-red-600">Price: ${item.price}</p>
                  <p className="text-black">Quantity: {item.quantity}</p>
                  <button
                    className="bg-red-500 text-white p-2 rounded-lg mt-2"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove from Cart
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-red-800">Your cart is empty</p>
            )}
            <button
              className="bg-blue-500 text-white p-2 rounded-lg w-full mt-4"
              onClick={() => {
                dispatch(clearCart());
                handleClose();
              }}
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
