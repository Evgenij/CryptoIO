import {
	ChangeEvent,
	ChangeEventHandler,
	FC,
	FormEvent,
	FormEventHandler,
	useState,
} from "react";
import { jc } from "../../utils/joinClasses";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Link } from "react-router-dom";

interface Props {
	className?: string;
}

interface IUserData {
	nickname: string;
	password: string;
	email: string;
}

const emptyUserData: IUserData = {
	nickname: "",
	password: "",
	email: "",
};

export const AuthPage: FC<Props> = ({ className }) => {
	const [isLogin, setIsLogin] = useState(true);
	const [userData, setUserData] = useState<IUserData>(emptyUserData);

	const handleSubmit: FormEventHandler<HTMLFormElement> = (
		e: FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		console.log(userData);
		setUserData(emptyUserData);
	};

	const handleChange: ChangeEventHandler<HTMLInputElement> = (
		e: ChangeEvent<HTMLInputElement>
	) => {
		setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	return (
		<div className={jc(className, "text-white flex flex-col gap-8 w-1/6")}>
			<h2
				className="text-2xl font-medium text-center"
				onClick={() => setIsLogin(!isLogin)}
			>
				{!isLogin ? "Sign up" : "Login"}
			</h2>
			<form
				onSubmit={handleSubmit}
				action=""
				className="flex flex-col gap-6"
			>
				<div className="flex flex-col gap-3">
					<InputText
						value={userData.nickname}
						placeholder="nickname"
						name="nickname"
						onChange={handleChange}
					/>
					{!isLogin && (
						<InputText
							value={userData.email}
							placeholder="email"
							name="email"
							onChange={handleChange}
						/>
					)}

					<Password
						value={userData.password}
						placeholder="password"
						name="password"
						onChange={handleChange}
						toggleMask
						feedback={false}
						tabIndex={1}
					/>
				</div>

				<div className="flex flex-col gap-3 items-center">
					<Button
						className="white w-full"
						label={!isLogin ? "Sign up" : "Login"}
					/>
					<Link to={"/"} className="text-zinc-500">
						back
					</Link>
				</div>
			</form>
		</div>
	);
};
