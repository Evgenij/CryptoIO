export interface IUser {
	id: number | null;
	email: string;
	nickname: string;
	password: string;
	isActivated: boolean;
}
