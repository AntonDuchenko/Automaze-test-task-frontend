import { Todo } from "@/types/Todo";
import Image from "next/image";
import cn from "classnames";
import classNames from "classnames";
import { chooseTitle } from "@/utils/chooseTitle";
import { deleteTodo, updateTodo } from "@/api/todos";
import { useAppDispatch } from "@/lib/hooks";
import * as todoSilce from "@/lib/features/todoSilce";
import { successNotification } from '@/utils/successNotification';
import { errorNotification } from '@/utils/errorNotification';

interface Props {
  todo: Todo;
}

export default function TodoItem({ todo }: Props) {
  const { id, completed, priority, title } = todo;
  const dispatch = useAppDispatch();

  const handleOnDelete = async (id: number) => {
    try {
      await deleteTodo(id);

      dispatch(todoSilce.deleteTodo(id));
      successNotification("Todo deleted!")
    } catch (error) {
      errorNotification(`${error}`);
    }
  };

  const handleOnToggle = async (id: number) => {
    try {
      await updateTodo(id, !completed);

      dispatch(todoSilce.toggleTodo(id));
      successNotification("Todo status changed!")
    } catch (error) {
      errorNotification(`${error}`);
    }
  };

  return (
    <tr className="border-solid border-b-[1px] border-slate-800 text-lg font-medium">
      <td className="text-center">{id}</td>
      <td className="flex justify-center py-5">
        <input
          style={{
            backgroundImage: classNames({
              "url('done.svg')": completed,
            }),
          }}
          onChange={() => handleOnToggle(id)}
          className="appearance-none cursor-pointer transition-all duration-300
          rounded-sm w-4 bg-gray-500 h-4 hover:bg-gray-700"
          type="checkbox"
          name="completed"
          id="completed"
          checked={completed}
        />
      </td>
      <td>{title}</td>

      <td
        className={cn(
          { "text-red-400": priority === 3 },
          { "text-yellow-300": priority === 2 },
          { "text-lime-400": priority === 1 }
        )}
      >
        {chooseTitle(priority)}

        <span
          className={cn(
            "animate-ping inline-block ml-2 h-[8px] w-[8px]",
            "rounded-full opacity-75 transition-all duration-300",
            { "bg-red-400": priority === 3 },
            { "bg-yellow-300": priority === 2 },
            { "bg-lime-400": priority === 1 }
          )}
        ></span>
      </td>

      <td className="flex gap-1 justify-end">
        <button
          onClick={() => handleOnDelete(id)}
          className="border-solid border-[1px] p-2 rounded-md hover:bg-slate-200 transition-all duration-300"
        >
          <Image src={"delete.svg"} alt="Delete icon" height={17} width={17} />
        </button>
      </td>
    </tr>
  );
}
