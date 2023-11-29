import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Pagination {
  page: number;
  tasksPerPage: number;
}

const initialState: Pagination = {
  page: 1,
  tasksPerPage: 10,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<{ pageNumber: number }>) {
      state.page = action.payload.pageNumber;
    },
    nextPage(state) {
      state.page += 1;
    },
    previousPage(state) {
      state.page -= 1;
    },
  },
});

export const { setCurrentPage, nextPage, previousPage } = paginationSlice.actions;
export default paginationSlice.reducer;
