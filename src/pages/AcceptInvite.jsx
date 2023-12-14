import { Button, FormLabel } from '@mui/material';
import { useState } from 'react';

const AcceptInvite = () => {
	const params = new URLSearchParams(window.location.search);
	const [passwordForm, setPasswordForm] = useState({
		password: '',
		password_confirmation: '',
	});

	const token = params.get('token');
	const email = params.get('email');
	const newUser = params.has('new');

	if (!token || !email) {
		return <>You be thief</>;
	}

	if (newUser) {
		return (
			<div className="container bg-primary">
				<form>
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
						<Button variant="contained">Submit</Button>
					</div>
				</form>
			</div>
		);
	} else {
		return <Button variant="contained">Accept Invite</Button>;
	}
};

export default AcceptInvite;
