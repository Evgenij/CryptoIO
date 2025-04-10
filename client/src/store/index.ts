import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./slices/usersSlice";
import typesSlice from "./slices/typesSlice";

const store = configureStore({
	reducer: {
		users: usersSlice,
		types: typesSlice,
	},
});

export type AppDispatch = typeof store.dispatch;
export default store;
