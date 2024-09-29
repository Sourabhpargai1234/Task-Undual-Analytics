"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { addItemToCart } from "../Redux/cartSlice";
import { RootState } from "../Redux/store";
import Cart from "../getCartItems/page";

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
}

export default function GetAllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState(""); 
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); 
  const dispatch=useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  console.log("cart",cartItems)


  const fetchProducts = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`
      );
      const data = await response.json();
      if (data.products.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }    
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        loading || 
        !hasMore 
      ) {
        return;
      }
      setPage((prevPage) => prevPage + 1);
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); 
  }, [loading, hasMore, page]); 
  

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(search.toLowerCase()) || 
      product.description.toLowerCase().includes(search.toLowerCase()) 
  );

  return (
    <div className="bg-white">
      <div className="float-right mx-4 my-4">
        <Cart />
      </div>
      <h1 className="text-center text-black font-bold text-3xl my-8">All Products</h1>

      <div className="text-center rounded-full my-8">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-black rounded-full w-780 h-16 text-3xl mx-40"
        />
      </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mx-4">
        {filteredProducts.length > 0 ? (
        filteredProducts.map((item, index) => (
          <div
            key={`${item.id}-${index}`}  
            className="bg-blue-400 flex justify-center h-80 items-center p-4 rounded-lg flex-col shadow-md"
          >
            <Link href={`/getAllProducts/${item.id}`}>
              <h1 className="text-2xl font-bold text-black">{item.title}</h1>
              <p className="italic">{item.description}</p>
              <p className="text-green-800">Category: {item.category}</p>
              <p className="text-red-800">Price: ${item.price}</p>
            </Link>
            <button
              className="bg-green-500 p-2 rounded-lg mt-2"
              onClick={() => dispatch(addItemToCart(item))}
            >
              Add to Cart
            </button>
          </div>
        ))
      ) : (
        <p>No products found</p>
      )}
        </div>

      {loading && <p className="text-center">Loading more products...</p>}
      {!hasMore && <p className="text-center">No more products available.</p>}
    </div>
  );
}
