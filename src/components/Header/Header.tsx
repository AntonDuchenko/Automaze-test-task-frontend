"use client"

import { TodoContext } from "@/context/TodoContext";
import { useContext } from "react";

export default function Header() {
  const { setIsModalActive } = useContext(TodoContext);

  return (
    <div className="container m-auto h-[80px] border-solid border-b-2 border-gray-800 flex justify-between items-center">
      <h1 className="text-4xl font-bold">Todos list</h1>

      <button
        onClick={() => setIsModalActive(true)}
        className="min-w-[200px] h-[40px] border-solid border-2 transition-all duration-300
      rounded-lg flex justify-center items-center font-semibold hover:bg-slate-200"
      >
        Create Todo
      </button>
    </div>
  );
}
