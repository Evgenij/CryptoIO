import { AxiosResponse } from "axios";
import $api from "..";
import { Type } from "../models/Type";

export default class TypesService {
	static async getTypes(): Promise<AxiosResponse<Type[]>> {
		return $api.get<Type[]>("/types/");
	}
}
