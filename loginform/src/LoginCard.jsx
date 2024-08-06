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
			setUsernameError(usernameRegex.test(formDetails.username));
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
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

	const iconStyle = {
		color: criteria.hasMinLength ? "green" : "red",
	};
	const oneLetterIconStyle = {
		color: criteria.hasLetter ? "green" : "red",
	};

	const oneNumberIconStyle = {
		color: criteria.hasNumber ? "green" : "red",
	};
	const hasSpecialCharStyle = {
		color: criteria.hasSpecialChar ? "green" : "red",
	};

	const invalidPassword = (obj) =>
		Object.values(obj).some((value) => value === false);

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
						autoComplete='on'
					/>
				</div>

				{usernameError && (
					<p className='error'>
						<i className='fa-solid fa-circle-exclamation' />
						Incorrect username: Username should not have any special characters
					</p>
				)}

				<div
					className={invalidPassword(criteria) ? "hasError" : "form-elements"}>
					<input
						type={showPassword ? "text" : "password"}
						id='password'
						name='password'
						required
						value={formDetails.password}
						onChange={handleChange}
						placeholder='&#xf023;   Password'
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
				{invalidPassword(criteria) && (
					<>
						<div className='error'>
							<p>Password should have:</p>
							<ul>
								<li className='list'>
									<p>👉 At least 8 characters</p>
									<i
										className={
											criteria.hasMinLength
												? "fa-solid fa-circle-check"
												: "fa-solid fa-circle-xmark"
										}
										style={iconStyle}
									/>
								</li>
								<li className='list'>
									<p>👉 At least one letter</p>
									<i
										className={
											criteria.hasLetter
												? "fa-solid fa-circle-check"
												: "fa-solid fa-circle-xmark"
										}
										style={oneLetterIconStyle}
									/>
								</li>
								<li className='list'>
									<p>👉 At least one number</p>
									<i
										className={
											criteria.hasNumber
												? "fa-solid fa-circle-check"
												: "fa-solid fa-circle-xmark"
										}
										style={oneNumberIconStyle}
									/>
								</li>
								<li className='list'>
									<p>👉 At least one special character</p>
									<i
										className={
											criteria.hasSpecialChar
												? "fa-solid fa-circle-check"
												: "fa-solid fa-circle-xmark"
										}
										style={hasSpecialCharStyle}
									/>
								</li>
							</ul>
						</div>
						<p className='password-info'>
							"Password should have minimum eight characters, at least one
							letter,one number and one special character"
						</p>
					</>
				)}
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
