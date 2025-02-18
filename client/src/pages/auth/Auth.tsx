import {
	ChangeEvent,
	ChangeEventHandler,
	FC,
	FormEvent,
	FormEventHandler,
	useEffect,
	useState,
} from "react";
import { jc } from "../../utils/joinClasses";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Message } from "primereact/message";
import { IUserData } from "../../interfaces/IUserData";
import AuthService from "../../services/AuthService";

interface Props {
	className?: string;
}

const emptyUserData: IUserData = {
	nickname: "",
	password: "",
	email: "",
	id: null,
	isActivated: false,
};

export const AuthPage: FC<Props> = ({ className }) => {
	const [isLogin, setIsLogin] = useState(true);
	const [userData, setUserData] = useState<IUserData>(emptyUserData);

	const {
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm<IUserData>({
		defaultValues: emptyUserData,
	});

	const onSubmit: SubmitHandler<IUserData> = async (data) => {
		console.log(data);
		try {
			if (isLogin) {
				const response = await AuthService.login(
					data.nickname,
					data.password
				);
				console.log(response);

				localStorage.setItem("token", response.data.tokens.accessToken);
			}
			reset();
		} catch (error) {
			console.log(error);
		}
	};

	console.log("errors", errors);

	// const handleSubmit: FormEventHandler<HTMLFormElement> = (
	// 	e: FormEvent<HTMLFormElement>
	// ) => {
	// 	e.preventDefault();
	// 	console.log(userData);
	// 	setUserData(emptyUserData);
	// };

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
				onSubmit={handleSubmit(onSubmit)}
				action=""
				className="flex flex-col gap-6"
			>
				<div className="flex flex-col gap-3">
					<div className="flex flex-col gap-1">
						<Controller
							name="nickname"
							control={control}
							rules={{
								required: {
									value: true,
									message: "This field is required",
								},
								minLength: {
									value: 4,
									message: "Minimal length is 4",
								},
							}}
							render={({ field, fieldState, formState }) => (
								<>
									<InputText
										id={field.name}
										placeholder={field.name}
										invalid={fieldState.invalid}
										{...field}
									/>
									{fieldState.error &&
										fieldState.isTouched && (
											<small
												id={field.name}
												className="text-red-500"
											>
												{fieldState.error?.message}
											</small>
										)}
								</>
							)}
						></Controller>
					</div>
					{!isLogin && (
						<div className="flex flex-col gap-1">
							<Controller
								name="email"
								control={control}
								rules={{
									pattern: {
										value: RegExp(
											"[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"
										),
										message:
											"Please input email in correct format",
									},
									required: {
										value: true,
										message: "This field is required",
									},
									minLength: {
										value: 4,
										message: "Minimal length is 4",
									},
								}}
								render={({ field, fieldState }) => (
									<>
										<InputText
											id={field.name}
											placeholder={field.name}
											invalid={fieldState.invalid}
											{...field}
										/>
										{fieldState.error &&
											fieldState.isTouched && (
												<small
													id={field.name}
													className="text-red-500"
												>
													{fieldState.error?.message}
												</small>
											)}
									</>
								)}
							></Controller>
						</div>
					)}
					<div className="flex flex-col gap-1">
						<Controller
							name="password"
							control={control}
							rules={{
								required: {
									value: true,
									message: "This field is required",
								},
								minLength: {
									value: 4,
									message: "Minimal length is 4",
								},
							}}
							render={({ field, fieldState }) => (
								<>
									<Password
										id={field.name}
										placeholder={field.name}
										invalid={fieldState.invalid}
										toggleMask
										feedback={!isLogin}
										tabIndex={1}
										{...field}
									/>
									{fieldState.error &&
										fieldState.isTouched && (
											<small
												id={field.name}
												className="text-red-500"
											>
												{fieldState.error?.message}
											</small>
										)}
								</>
							)}
						></Controller>
					</div>
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
