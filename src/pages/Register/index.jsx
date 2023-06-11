import authStyle from '../Login/styles.module.scss';

import { useState } from 'react';
import { useSignupMutation } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password_confirmation, setPasswordConfirmation] = useState('');
	const [signup, { isLoading, isSuccess }] = useSignupMutation();
	const navigate = useNavigate();

	const submitSignupForm = async (e) => {
		e.preventDefault();
		const {
			data: { token, user },
		} = await signup({ name, email, password, password_confirmation }).unwrap();
		localStorage.setItem('authToken', token);
		navigate('/dashboard');
	};

	return (
		<>
			<div className="container">
				<h1>Sign Up</h1>

				<form className={authStyle.loginForm} onSubmit={submitSignupForm}>
					<input
						type="text"
						name="name"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
						placeholder="John Doe"
						required
					/>
					<input
						type="email"
						name="email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						placeholder="johndoe@example.com"
						required
					/>
					<input
						type="password"
						name="password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						placeholder="********"
						required
					/>
					<input
						type="password"
						name="password_confirmation"
						value={password_confirmation}
						onChange={(e) => {
							setPasswordConfirmation(e.target.value);
						}}
						placeholder="********"
						required
					/>

					<button type="submit">Submit</button>
				</form>
			</div>
		</>
	);
};

export default Register;
