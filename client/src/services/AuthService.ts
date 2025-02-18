import $api from "../api";
import { AxiosResponse } from "axios";
import { IAuthResponse } from "../api/models/response/IAuthResponse";

export default class AuthService {
	static async login(
		nickname: string,
		password: string
	): Promise<AxiosResponse<IAuthResponse>> {
		return $api.post<IAuthResponse>("/user/login", { nickname, password });
	}

	static async registration(
		nickname: string,
		email: string,
		password: string
	): Promise<AxiosResponse<IAuthResponse>> {
		return $api.post<IAuthResponse>("/user/registration", {
			nickname,
			email,
			password,
		});
	}

	static async logout(): Promise<AxiosResponse<void>> {
		return $api.post("/user/logout");
	}
}
