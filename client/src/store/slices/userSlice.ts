import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import { IUser } from "../../api/models/IUser";
import AuthService from "../../services/AuthService";
import axios from "axios";
import router from "../../router";
import { DASHBOARD_ROUTE } from "../../constants/routes";
import { IAuthResponse } from "../../api/models/response/IAuthResponse";
import { API_URL } from "../../api";

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
					state.isAuth = true;
					state.loading = false;
					state.userData = action.payload;

					router.navigate(DASHBOARD_ROUTE).then();
				},
			}
		),
		registration: create.asyncThunk(
			async (user: {
				nickname: string;
				password: string;
				email: string;
			}) => {
				try {
					const response = await AuthService.registration(
						user.nickname,
						user.email,
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
					state.isAuth = true;
					state.userData = action.payload;
				},
			}
		),
		logout: create.asyncThunk(
			async () => {
				try {
					await AuthService.logout();
					localStorage.removeItem("token");
				} catch (error) {
					if (axios.isAxiosError(error)) {
						return Promise.reject(error.response?.data.message);
					} else {
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
				fulfilled: (state) => {
					state.isAuth = false;
					state.loading = false;
					state.userData = {} as IUser;
				},
			}
		),
		checkAuth: create.asyncThunk(
			async () => {
				try {
					console.log("Check Auth");

					const response = await axios.get<IAuthResponse>(
						`${API_URL}/user/refresh`,
						{ withCredentials: true }
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
					state.isAuth = true;
					state.loading = false;
					state.userData = action.payload;
				},
			}
		),
	}),
});
export const { login, logout, registration, checkAuth } = userSlice.actions;
export default userSlice.reducer;
