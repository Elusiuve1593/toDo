import { configureStore } from "@reduxjs/toolkit";
import { setLoading } from "./slice";
import preloader from "./slice";

const store = configureStore({
  reducer: {
    preloader,
  },
});

describe("preloaderSlice", () => {
  it("should handle setLoading", () => {
    expect(store.getState().preloader.isLoading).toBe(false);
    store.dispatch(setLoading({ isLoading: true }));
    expect(store.getState().preloader.isLoading).toBe(true);
    store.dispatch(setLoading({ isLoading: false }));
    expect(store.getState().preloader.isLoading).toBe(false);
  });
});
