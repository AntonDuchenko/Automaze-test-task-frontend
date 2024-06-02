import { Dispatch, SetStateAction } from 'react';

export type TodoContextType = {
  isModalActive: boolean,
  setIsModalActive: Dispatch<SetStateAction<boolean>>,
};
