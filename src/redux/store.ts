import { ThunkAction, configureStore, Action } from "@reduxjs/toolkit";
import todo from "./todo/slice";

const reducer = {
  todo,
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
