import { AxiosResponse } from "axios";
import $api from "..";
import { User } from "../models/User";

export default class UsersService {
	static async getUsers(): Promise<AxiosResponse<User[]>> {
		return $api.get<User[]>("/users/get");
	}
}
