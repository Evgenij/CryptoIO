import { IUser } from "../User";

export interface IAuthResponse {
	tokens: { accessToken: string; refreshToken: string };
	user: IUser;
}
