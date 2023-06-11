import styles from './styles.module.scss';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useLoginMutation } from '../../services/api';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();

	const submitForm = async (e) => {
		e.preventDefault();
		try {
			const result = await login({ email, password }).unwrap();
			const {
				data: { token },
			} = result;

			localStorage.setItem('authToken', token);
			navigate('/dashboard');
		} catch (err) {}
	};

	return (
		<>
			<div className={styles.container}>
				<h1>Login</h1>

				{isLoading && <p>Loading...</p>}
				{isError && <p>Something went wrong: {error.message}</p>}

				<form className={styles.loginForm} onSubmit={submitForm}>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<button type="submit" disabled={isLoading ? true : false}>
						Login
					</button>
				</form>

				<p className="center">
					Don't have an account? <Link to="/signup">Sign Up</Link>
				</p>
			</div>
		</>
	);
};

export default Login;
