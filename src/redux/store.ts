import { ThunkAction, configureStore, Action } from "@reduxjs/toolkit";
import todo from "./todo/slice";
import pagination from "./pagination/slice";
import preloader from "./preloader/slice";

const reducer = {
  todo,
  pagination,
  preloader,
};

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = typeof store.dispatch;
export default store;
