import { AxiosResponse } from "axios";
import $api from "../api";
import { IUserData } from "../interfaces/IUserData";

export default class UserService {
	static async getUsers(): Promise<AxiosResponse<IUserData[]>> {
		return $api.get<IUserData[]>("/users/get");
	}
}
