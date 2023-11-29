import type { RootState } from "../store";

export const preloader = (state: RootState) => state.preloader.isLoading;
