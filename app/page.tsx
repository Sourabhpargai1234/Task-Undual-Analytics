"use client";
import { CiShop } from "react-icons/ci";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleNavigation = () => {
    router.push("/getAllProducts"); 
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-cover bg-center"
      style={{
        backgroundImage: "url('/Home.png')",
      }}
    >
      <h1 className="font-bold text-3xl text-black">Task-Undual-Analytics</h1>
      <div onClick={handleNavigation} className="text-black bg-green-400 cursor-pointer">
        <CiShop className="h-20 w-20 text-white" /> 
      </div>
    </div>
  );
}
