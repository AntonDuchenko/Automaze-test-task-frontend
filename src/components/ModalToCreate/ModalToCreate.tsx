"use client";

import { createTodo } from "@/api/todos";
import { TodoContext } from "@/context/TodoContext";
import * as todoSilce from "@/lib/features/todoSilce";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { errorNotification } from "@/utils/errorNotification";
import { successNotification } from "@/utils/successNotification";
import classNames from "classnames";
import { ChangeEvent, FormEvent, useContext, useState } from "react";

export default function ModalToCreate() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(0);
  const { isModalActive, setIsModalActive } = useContext(TodoContext);
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.todos);

  const resetForm = () => {
    setTitle("");
    setPriority(0);
    setIsModalActive(false);
  };

  const handleOnChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim()) {
      setTitle(e.target.value.trim());
    }
  };

  const handleOnChoosePriority = (e: ChangeEvent<HTMLSelectElement>) => {
    setPriority(+e.target.value);
  };

  const handleOnCancel = () => {
    setIsModalActive(false);
    resetForm();
  };

  const handleOnSumbit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isExist = todos.find((todo) => todo.title === title);

    if (title && priority && !isExist) {
      try {
        const newTodo = await createTodo({
          title,
          priority,
        });

        dispatch(todoSilce.createTodo(newTodo));
        successNotification(`Todo '${title}' created!`);

        resetForm();
      } catch (error) {
        errorNotification(`${error}`);
      }
    } else if (isExist) {
      errorNotification(`Todo '${title}' is already exist!`);
    } else {
      errorNotification("All fields are required!");
    }
  };

  return (
    <div
      className={classNames(
        "h-screen w-screen bg-black/40 fixed flex justify-center items-center top-0 left-0 opacity-0 pointer-events-none",
        {
          "!opacity-100 !pointer-events-auto": isModalActive,
        }
      )}
    >
      <form
        onSubmit={handleOnSumbit}
        action="post"
        className={classNames("flex w-[400px] h-[190px] flex-col justify-between items-center p-2 bg-white border-2 rounded-md scale-0 transition-all duration-300", 
          {
            "!scale-100": isModalActive,
          }
        )}
      >
        <div className="flex flex-col gap-2 w-full">
          <input
            value={title}
            onChange={handleOnChangeTitle}
            type="text"
            placeholder="Enter task name"
            className="border rounded-md h-[40px] p-2"
          />

          <select
            onChange={handleOnChoosePriority}
            value={priority}
            name="priority"
            id="priority"
            className="border rounded-md p-2"
          >
            <option value={0} disabled>
              Choose priority
            </option>
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
          </select>
        </div>

        <div className="flex w-full justify-between">
          <button
            type="button"
            onClick={handleOnCancel}
            className="min-w-[49%] h-[40px] border-solid border-2 transition-all duration-300
    rounded-lg flex justify-center items-center font-semibold bg-slate-300 hover:bg-slate-500"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="min-w-[49%] h-[40px] border-solid border-2 transition-all duration-300
    rounded-lg flex justify-center items-center font-semibold hover:bg-slate-200"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
