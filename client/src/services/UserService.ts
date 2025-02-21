import { AxiosResponse } from "axios";
import $api from "../api";
import { IUser } from "../api/models/IUser";

export default class UserService {
	static async getUsers(): Promise<AxiosResponse<IUser[]>> {
		return $api.get<IUser[]>("/users/get");
	}
}
