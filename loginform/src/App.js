import "./App.css";
import { useState } from "react";

function App() {
	const [showPassword, setShowPassword] = useState(" ");
	return (
		<div className='App'>
			<div className='card'>
				<h1 className='heading'>Login Form</h1>

				<form className='form'>
					<div className='form-elements'>
						<label htmlFor='name'>UserName</label>

						<input
							type='text'
							id='name'
							placeholder="&#xf007;   Enter your User Name"

						/>




					</div>
					<div className='form-elements'>
						<label htmlFor='password'>Password</label>
						<input
							type={showPassword ? "text" : "password"}
							id='password'
							placeholder='&#xf023;   Enter your password'
						/>
					</div>

					<div className='form-elements checkbox'>
						<label htmlFor='checkbox'>Show Password</label>
						<input
							type='checkbox'
							name='checkbox'
							id='checkbox'
							value={showPassword}
							onChange={() => {
								setShowPassword((prev) => !prev);
							}}
						/>
					</div>
          <button className="login-btn"type="submit">Sign In </button>
				</form>
			</div>
			<div></div>
		</div>
	);
}

export default App;
