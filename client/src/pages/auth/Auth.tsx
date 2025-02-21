import { FC, useState } from "react";
import { jc } from "../../utils/joinClasses";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Message } from "primereact/message";
import { IUser } from "../../api/models/IUser";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AppDispatch } from "../../store";
import { IUserSliceState } from "../../store/slices/userSlice";
import { login } from "../../store/slices/userSlice";

interface Props {
	className?: string;
}

const emptyUserData: IUser = {
	nickname: "",
	password: "",
	email: "",
	id: null,
	isActivated: false,
};

export const AuthPage: FC<Props> = ({ className }) => {
	const [isLogin, setIsLogin] = useState(true);
	const [errors, setErrors] = useState<String[]>([]);

	const dispatch = useDispatch<AppDispatch>();
	const user = useSelector((state: any) => state.user.userData);
	const loading = useSelector((state: any) => state.user.loading);
	const error = useSelector((state: any) => state.user.error);

	const {
		handleSubmit,
		reset,
		control,
		//formState: { errors },
	} = useForm<IUser>({
		defaultValues: emptyUserData,
	});

	const onSubmit: SubmitHandler<IUser> = async (data) => {
		setErrors([]);
		try {
			if (isLogin) {
				// const response = await AuthService.login(
				// 	data.nickname,
				// 	data.password
				// );
				// console.log(response);
				// localStorage.setItem("token", response.data.tokens.accessToken);

				dispatch(
					login({ nickname: data.nickname, password: data.password })
				);

				// reset();
			}
		} catch (error) {
			// console.log(typeof error);
			// if (axios.isAxiosError(error)) {
			// 	// Access to config, request, and response
			// 	setErrors((prev) => [...prev, error.response?.data.message]);
			// } else {
			// 	// Just a stock error
			// 	console.log(error);
			// }
		}
	};

	return (
		<div className={jc(className, "text-white flex flex-col gap-8")}>
			<h2
				className="text-2xl font-medium text-center"
				onClick={() => setIsLogin(!isLogin)}
			>
				{!isLogin ? "Sign up" : "Login"}
			</h2>

			<form
				onSubmit={handleSubmit(onSubmit)}
				action=""
				className="flex flex-col gap-6 w-min"
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
							render={({ field, fieldState }) => (
								<>
									<InputText
										id={field.name}
										placeholder={field.name}
										invalid={fieldState.invalid}
										{...field}
									/>
									{fieldState.invalid && (
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
										{fieldState.invalid && (
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
									{fieldState.invalid && (
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
					{loading && <p>Loading...</p>}
					<Link to={"/"} className="text-zinc-500">
						back
					</Link>
				</div>
				{error && <Message text={error} severity="error"></Message>}
			</form>
		</div>
	);
};
