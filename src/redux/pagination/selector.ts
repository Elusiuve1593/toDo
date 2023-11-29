import type { RootState } from '../store';

export const tasksPerPage = (state: RootState) => state.pagination.tasksPerPage;
export const currentTaskPage = (state: RootState) => state.pagination.page;

