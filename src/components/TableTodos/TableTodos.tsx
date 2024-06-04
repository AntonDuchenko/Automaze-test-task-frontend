import { filteredTodos } from "@/utils/filteredTodos";
import Image from "next/image";
import Link from "next/link";
import SortImage from "../SortImage/SortImage";
import TodoItem from "../TodoItem/TodoItem";
import { useSearchParams } from "next/navigation";
import { Todo } from "@/types/Todo";
import SearchLink from "../SearchLink/SearchLink";

interface Props {
  todos: Todo[];
}

export function TableTodos({ todos }: Props) {
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort") || "";
  const order = searchParams.get("order") || "";

  return (
    <table className="w-full">
      <thead className="border-solid border-b-2 border-slate-800 ">
        <tr>
          <th>#</th>
          <th className="flex justify-center py-3">
            <Image src={"done.svg"} alt="Done Icon" width={20} height={20} />
          </th>
          <th className="text-left">Title</th>
          <th className="text-left flex">
            Priority
            <SearchLink
              params={{
                sort: sort === "priority" && order ? null : "priority",
                order: sort === "priority" && !order ? "desc" : null,
              }}
            >
              <SortImage colName={"Priority"} order={order} sort={sort} />
            </SearchLink>
          </th>
        </tr>
      </thead>

      <tbody>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </tbody>
    </table>
  );
}
