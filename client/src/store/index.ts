import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";



const store = configureStore({
	reducer: {
		user: userSlice,
	}
});

export type AppDispatch = typeof store.dispatch;
export default store;
