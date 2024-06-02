"use client";

import { Loader } from "@/components/Loader/Loader";
import ModalToCreate from "@/components/ModalToCreate/ModalToCreate";
import { TableTodos } from '@/components/TableTodos/TableTodos';
import { useAppSelector } from "@/lib/hooks";
import { Statuses } from "@/types/Statuses";
import { filteredTodos } from "@/utils/filteredTodos";
import debounce from "lodash.debounce";
import { usePathname, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const sort = searchParams.get("sort") || "";
  const order = searchParams.get("order") || "";

  const { todos, loading } = useAppSelector((state) => state.todos);

  const preparedTodos = filteredTodos(todos, status, query, sort, order);

  const debouncedSetSearchParams = debounce((value: string) => {
    setQuery(value);

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("query", value);

    return pathname + "?" + newSearchParams?.toString();
  }, 1000);

  const handleOnSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearchParams(e.target.value);
  };

  return (
    <main className="container m-auto mt-3">
      <div className="flex gap-2 h-[40px] mb-4">
        <select
          onChange={handleOnSelect}
          value={status}
          name="fitler"
          id="fitler"
          className="w-[150px] border rounded-md p-2"
        >
          <option value={Statuses.All}>All</option>
          <option value={Statuses.Completed}>Done</option>
          <option value={Statuses.Active}>In Progress</option>
        </select>

        <input
          onChange={handleOnChange}
          type="text"
          placeholder="Search..."
          className="border w-full rounded-md p-2"
        />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <TableTodos todos={preparedTodos} />
      )}

      <ModalToCreate />
    </main>
  );
}
