"use client"

import { TodoContextType } from '@/types/TodoContextType';
import { ReactNode, createContext, useMemo, useState } from "react";

export const TodoContext = createContext<TodoContextType>({
  isModalActive: false,
  setIsModalActive: () => {},
});

interface Props {
  children: ReactNode;
}

export const TodoProvider = ({ children }: Props) => {
  const [isModalActive, setIsModalActive] = useState(false);

  const preparedValue = useMemo(() => ({
    isModalActive,
    setIsModalActive,
  }), [isModalActive]);

  return <TodoContext.Provider value={preparedValue}>{children}</TodoContext.Provider>;
};
