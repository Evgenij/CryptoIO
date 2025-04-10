import $api from "..";
import { AxiosResponse } from "axios";
import { IAuthResponse } from "../models/response/IAuthResponse";

export default class AuthService {
	static async login(
		nickname: string,
		password: string
	): Promise<AxiosResponse<IAuthResponse>> {
		return $api.post<IAuthResponse>("/users/login", { nickname, password });
	}

	static async registration(
		nickname: string,
		email: string,
		password: string
	): Promise<AxiosResponse<IAuthResponse>> {
		return $api.post<IAuthResponse>("/users/registration", {
			nickname,
			email,
			password,
		});
	}

	static async logout(): Promise<AxiosResponse<void>> {
		return $api.post("/users/logout");
	}
}
