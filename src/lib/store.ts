import { configureStore } from '@reduxjs/toolkit'
import todoSilce from './features/todoSilce'

export const makeStore = () => {
  return configureStore({
    reducer: {
      todos: todoSilce,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']