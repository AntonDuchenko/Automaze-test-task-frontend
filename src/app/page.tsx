"use client";

import { Loader } from "@/components/Loader/Loader";
import ModalToCreate from "@/components/ModalToCreate/ModalToCreate";
import { TableTodos } from "@/components/TableTodos/TableTodos";
import { useAppSelector } from "@/lib/hooks";
import { Statuses } from "@/types/Statuses";
import { filteredTodos } from "@/utils/filteredTodos";
import { getSearchWith } from "@/utils/searchHepler";
import debounce from "lodash.debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, Suspense } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const route = useRouter();

  const sort = searchParams.get("sort") || "";
  const order = searchParams.get("order") || "";
  const query = searchParams.get("query") || "";
  const status = searchParams.get("status") || "";

  const { todos, loading } = useAppSelector((state) => state.todos);

  const handleOnSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSearchParams = getSearchWith(searchParams, {
      status: e.target.value === Statuses.All ? null : e.target.value,
    });

    route.push(`?${newSearchParams?.toString()}`);
  };

  const handleOnChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = getSearchWith(searchParams, {
      query: e.target.value || null,
    });

    route.push(`?${newSearchParams?.toString()}`);
  }, 1000);

  const preparedTodos = filteredTodos(todos, status, query, sort, order);

  return (
    <Suspense>
      <main className="container m-auto mt-3">
        <Suspense>
          <div className="flex gap-2 h-[40px] mb-4">
            <Suspense>
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
            </Suspense>

            <Suspense>
              <input
                defaultValue={query}
                onChange={handleOnChange}
                type="search"
                placeholder="Search..."
                className="border w-full rounded-md p-2"
              />
            </Suspense>
          </div>
        </Suspense>

        <Suspense>
          {loading ? <Loader /> : <TableTodos todos={preparedTodos} />}
        </Suspense>

        <ModalToCreate />
      </main>
    </Suspense>
  );
}
