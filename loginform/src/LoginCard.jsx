import "./LoginCard.css";
import { useState } from "react";
import FormFooter from "./FormFooter.jsx";

const LoginCard = (props) => {
	const [showPassword, setShowPassword] = useState(" ");
	const [usernameError, setUsernameError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [formDetails, setFormDetails] = useState({
		username: "",
		password: "",
	});

	const handleShowPassword = (e) => {
		e.preventDefault();
		setShowPassword((prev) => !prev);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormDetails((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formDetails);
		const passwordRegex = /[a-zA-Z0-9]+/;
		setPasswordError(!passwordRegex.test(formDetails.password));
		console.log(!passwordRegex.test(formDetails.password));
		if (formDetails.username.includes("*")) {
			setUsernameError(true);
		}
	};
	return (
		<div className='card'>
			<div className='user-icon'>
				<i className='fa-regular fa-user' />
			</div>

			<form className='form'>
				<div className={!usernameError ? "form-elements" : "hasError"}>
					<input
						type='text'
						id='name'
						name='username'
						value={formDetails.username}
						onChange={handleChange}
						placeholder='&#xf007;   Username'
						required
					/>
				</div>
				{usernameError && (
					<p className='error'>
						<i className='fa-solid fa-circle-exclamation' />
						Incorrect username
					</p>
				)}
				<div className={!passwordError ? "form-elements" : "hasError"}>
					<input
						type={showPassword ? "text" : "password"}
						id='password'
						name='password'
						pattern=''
						required
						value={formDetails.password}
						onChange={handleChange}
						placeholder='&#xf023;   Password'
					/>

					<button
						className='password-icon'
						onClick={handleShowPassword}>
						<i
							className={
								showPassword ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"
							}
						/>
					</button>
				</div>
				{passwordError && (
					<p className='error'>
						<i className='fa-solid fa-circle-exclamation' />
						Incorrect password: Password should not contain any special characters
					</p>
				)}

				<button
					className='login-btn'
					type='submit'
					onClick={handleSubmit}>
					{props.name}
				</button>
				<FormFooter />
			</form>
		</div>
	);
};

export default LoginCard;
