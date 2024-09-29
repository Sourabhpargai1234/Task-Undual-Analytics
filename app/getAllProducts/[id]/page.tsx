"use client"
import { useEffect, useState } from "react";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const {id } = params;
  interface Product {
    id: number;
    title: string,
    category: string,
    name: string;
    price: number;
    description?: string;
  }
  
  const [product, setProduct] = useState<Product | null>(null);
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data); 
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
      <p className="italic">{product.description}</p>
      <p className="text-green-800">Category: {product.category}</p>
      <p className="text-red-600">Price: ${product.price}</p>
    </div>
  );
}
