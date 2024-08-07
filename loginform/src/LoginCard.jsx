import "./LoginCard.css";
import { useState } from "react";
import FormFooter from "./FormFooter.jsx";

const LoginCard = (props) => {
	const [showPassword, setShowPassword] = useState(false);
	const [usernameError, setUsernameError] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [criteria, setCriteria] = useState({
		hasMinLength: true,
		hasLetter: true,
		hasSpecialChar: true,
		hasNumber: true,
	});

	const [formDetails, setFormDetails] = useState({
		username: "",
		password: "",
	});

	const handleShowPassword = (e) => {
		e.preventDefault();
		setShowPassword((prev) => !prev);
	};

	const handleCheckboxChange = (e) => {
		setRememberMe(e.target.checked);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormDetails((prev) => ({ ...prev, [name]: value }));

		if (name === "password") {
			setCriteria({
				hasMinLength: value.length >= 8,
				hasLetter: /[a-zA-Z]/.test(value),
				hasNumber: /\d/.test(value),
				hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
			});
		}

		if (name === "username") {
			const usernameRegex = /[!@#$%^&*()\-+={}[\]:;"'<>,.?|\\]/;
			setUsernameError(usernameRegex.test(value));
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Reset criteria and form details after submission
		setCriteria({
			hasMinLength: true,
			hasLetter: true,
			hasNumber: true,
			hasSpecialChar: true,
		});
		setFormDetails({
			username: "",
			password: "",
		});
		console.log(formDetails);
	};

	const invalidPassword = Object.values(criteria).some((value) => !value);

	return (
		<div className='card'>
			<div className='user-icon'>
				<i className='fa-regular fa-user' />
			</div>

			<form
				className='form'
				onSubmit={handleSubmit}>
				<div className={`form-elements ${usernameError ? "hasError" : ""}`}>
					<input
						type='text'
						name='username'
						value={formDetails.username}
						onChange={handleChange}
						placeholder='&#xf007;   Username'
						required
						autoComplete='on'
					/>
				</div>

				{usernameError && (
					<p className='error'>
						<i className='fa-solid fa-circle-exclamation' />
						Incorrect username: Username should not have any special characters
					</p>
				)}

				<div className={`form-elements ${invalidPassword ? "hasError" : ""}`}>
					<input
						type={showPassword ? "text" : "password"}
						name='password'
						value={formDetails.password}
						onChange={handleChange}
						placeholder='&#xf023;   Password'
						required
						autoComplete='on'
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

				{invalidPassword && (
					<>
						<div className='error'>
							<p>Password should have:</p>
							<ul>
								{Object.entries(criteria).map(([key, value]) => (
									<li
										className='list'
										key={key}>
										<p>👉 {getCriteriaText(key)}</p>
										<i
											className={`fa-solid ${
												value ? "fa-circle-check" : "fa-circle-xmark"
											}`}
											style={{ color: value ? "green" : "red" }}
										/>
									</li>
								))}
							</ul>
						</div>
						<p className='password-info'>
							"Password should have minimum eight characters, at least one
							letter, one number, and one special character"
						</p>
					</>
				)}

				<div className='checkbox-wrap'>
					<div className='checkbox'>
						<input
							type='checkbox'
							name='rememberme'
							id='rememberme'
							checked={rememberMe}
							onChange={handleCheckboxChange}
						/>
						<label htmlFor='rememberme'>Remember me</label>
					</div>
					<a href='https://www.google.com/'>Forgot Password?</a>
				</div>

				<button
					className='login-btn'
					type='submit'>
					{props.name}
				</button>
				<p className='footer-text'>or Login with</p>
				<hr />
				<FormFooter />
			</form>
		</div>
	);
};

const getCriteriaText = (key) => {
	switch (key) {
		case "hasMinLength":
			return "At least 8 characters";
		case "hasLetter":
			return "At least one letter";
		case "hasNumber":
			return "At least one number";
		case "hasSpecialChar":
			return "At least one special character";
		default:
			return "";
	}
};

export default LoginCard;
