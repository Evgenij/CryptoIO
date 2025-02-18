import { IUserData } from "../../../interfaces/IUserData";

export interface IAuthResponse {
	tokens: { accessToken: string; refreshToken: string };
	user: IUserData;
}
