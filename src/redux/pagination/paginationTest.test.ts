import { configureStore } from "@reduxjs/toolkit";
import paginationReducer, {
    Pagination,
    nextPage,
    previousPage,
    setCurrentPage,
} from "./slice";

interface RootState {
  pagination: Pagination;
}

describe("paginationSlice", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    const initialState: RootState = {
      pagination: {
        page: 1,
        tasksPerPage: 12,
      },
    };

    store = configureStore({
      reducer: {
        pagination: paginationReducer,
      },
      preloadedState: initialState,
    });
  });

  it("should handle setCurrentPage", () => {
    store.dispatch(setCurrentPage({ pageNumber: 3 }));
    const state: any = store.getState();
    expect(state.pagination.page).toBe(3);
  });

  it("should handle nextPage", () => {
    store.dispatch(nextPage());
    const state: any = store.getState();
    expect(state.pagination.page).toBe(2);
  });

  it("should handle previousPage", () => {
    store.dispatch(setCurrentPage({ pageNumber: 3 }));

    store.dispatch(previousPage());
    const state: any = store.getState();
    expect(state.pagination.page).toBe(2);
  });
});
