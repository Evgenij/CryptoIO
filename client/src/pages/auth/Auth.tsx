import { FC, useState } from "react";
import { jc } from "../../utils/joinClasses";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Message } from "primereact/message";
import { IUser } from "../../api/models/IUser";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { login, logout, registration } from "../../store/slices/userSlice";

import { Button, InputText, Password } from "../../components/ui/index";
import router from "../../router";
import { DASHBOARD_ROUTE } from "../../constants/routes";

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

	const dispatch = useDispatch<AppDispatch>();
	const loading = useSelector((state: any) => state.user.loading);
	const error = useSelector((state: any) => state.user.error);
	const isAuth = useSelector((state: any) => state.user.isAuth);

	const {
		handleSubmit,
		// reset,
		control,
		//formState: { errors },
	} = useForm<IUser>({
		defaultValues: emptyUserData,
	});

	const onSubmit: SubmitHandler<IUser> = async (data) => {
		try {
			if (isLogin) {
				dispatch(
					login({ nickname: data.nickname, password: data.password })
				);
			} else {
				dispatch(
					registration({
						nickname: data.nickname,
						email: data.email,
						password: data.password,
					})
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleClickLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(logout());
	};

	return (
		<div className="text-white">
			{isAuth && !isLogin ? (
				<div className="flex flex-col gap-14 items-center">
					<h2 className="text-2xl font-medium text-center">
						The link{" "}
						<span className="text-yellow-500">
							to activate your account
						</span>{" "}
						has been sent to your e-mail address
					</h2>
					<p className="opacity-30 underline">
						I didn't get the message
					</p>
				</div>
			) : (
				<div className={jc(className, "flex flex-col gap-8 ")}>
					<h2
						className="text-2xl font-medium text-center"
						onClick={() => setIsLogin(!isLogin)}
					>
						{!isLogin ? "Sign up" : "Login"}
					</h2>
					<form
						onSubmit={handleSubmit(onSubmit)}
						action=""
						className="flex flex-col items-center gap-6 w-full"
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
												message:
													"This field is required",
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
														{
															fieldState.error
																?.message
														}
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

						<div className="flex flex-col gap-3 items-center w-full">
							<Button
								className="white w-full"
								label={!isLogin ? "Sign up" : "Login"}
							/>
							{loading && <p>Loading...</p>}
							{isAuth && (
								<Button
									className="w-full"
									outlined
									label="Logout"
									onClick={handleClickLogout}
								/>
							)}

							<Link to={"/"} className="text-zinc-500">
								back
							</Link>
						</div>
						{error && (
							<Message
								className="w-full"
								text={error}
								severity="error"
							></Message>
						)}
					</form>
				</div>
			)}
		</div>
	);
};
