import {
	createSlice,
	buildCreateSlice,
	asyncThunkCreator,
} from "@reduxjs/toolkit";
import { IUser } from "../../api/models/IUser";
import AuthService from "../../services/AuthService";
import axios, { AxiosError } from "axios";

export interface IUserSliceState {
	userData: IUser | null | undefined;
	isAuth: boolean;
	loading: boolean;
	error: string | null | undefined;
}

const initialState: IUserSliceState = {
	userData: null,
	isAuth: false,
	loading: false,
	error: null,
};

const createAppSlice = buildCreateSlice({
	creators: { asyncThunk: asyncThunkCreator },
});

const userSlice = createAppSlice({
	name: "user",
	initialState,
	reducers: (create) => ({
		setAuth: create.reducer<boolean>((state, action) => {
			state.isAuth = action.payload;
		}),
		login: create.asyncThunk(
			async (user: { nickname: string; password: string }) => {
				try {
					const response = await AuthService.login(
						user.nickname,
						user.password
					);
					localStorage.setItem(
						"token",
						response.data.tokens.accessToken
					);
					return response.data.user;
				} catch (error) {
					if (axios.isAxiosError(error)) {
						return Promise.reject(error.response?.data.message);
					} else {
						// Just a stock error
						console.log(error);
					}
				}
			},
			{
				pending: (state) => {
					state.loading = true;
					state.error = null;
				},
				rejected: (state, action) => {
					state.loading = false;
					state.error = action.error.message;
				},
				fulfilled: (state, action) => {
					state.loading = false;
					state.userData = action.payload;
				},
			}
		),
	}),
});
export const { login } = userSlice.actions;
export default userSlice.reducer;
