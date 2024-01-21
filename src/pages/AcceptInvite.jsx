import { Button, FormLabel } from '@mui/material';
import { useState } from 'react';
import { useAcceptTeamInviteMutation } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AcceptInvite = () => {
	const [accept, accepting] = useAcceptTeamInviteMutation();
	const params = new URLSearchParams(window.location.search);
	const [passwordForm, setPasswordForm] = useState({
		password: '',
		password_confirmation: '',
	});

	const navigate = useNavigate();

	const token = params.get('token');
	const email = params.get('email');
	const newUser = params.has('new');

	if (!token || !email) {
		return <>You be thief</>;
	}

	const acceptInvite = async () => {
		try {
			let data = { token, email };
			if (newUser) data = { ...data, ...passwordForm, new: true };
			const response = await accept(data).unwrap();

			localStorage.setItem("authToken", response.auth?.token);
      navigate("/dashboard");
		} catch (err) {
			console.error(err);
		}
	};

	if (newUser) {
		return (
			<div className="container bg-primary">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						acceptInvite();
					}}
				>
					<div className="form-group">
						<FormLabel>Password</FormLabel>
						<br />
						<input
							type="password"
							className="form-control"
							value={passwordForm.password}
							onChange={(e) =>
								setPasswordForm({ ...passwordForm, password: e.target.value })
							}
						/>
					</div>
					<div className="form-group">
						<FormLabel>Confirm Password</FormLabel>
						<br />
						<input
							type="password"
							className="form-control"
							value={passwordForm.password_confirmation}
							onChange={(e) =>
								setPasswordForm({
									...passwordForm,
									password_confirmation: e.target.value,
								})
							}
						/>
					</div>
					<div className="form-group">
						<br />
						<Button
							variant="contained"
							onClick={(e) => {
								e.preventDefault();
								acceptInvite();
							}}
						>
							Submit
						</Button>
					</div>
				</form>
			</div>
		);
	} else {
		return (
			<Button
				variant="contained"
				onClick={() => {
					acceptInvite();
				}}
			>
				Accept Invite
			</Button>
		);
	}
};

export default AcceptInvite;
