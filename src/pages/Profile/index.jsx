import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProgressLoader from '../../components/Loaders/ProgessLoader';
import TwoFaScreen from '../../components/2FA';
import {
	useGetUserQuery,
	useUpdateProfileMutation,
	useSetup2FaMutation,
} from '../../services/api';
import TeamList from '../../components/Team';

const Profile = () => {
	let { data, isLoading, isError, error } = useGetUserQuery();

	const [update, updateResult] = useUpdateProfileMutation();
	const [name, setName] = useState('');
	const navigate = useNavigate();

	const [twoFa, setTwoFa] = useState({ qrCode: null, secret: null });

	const [setup2Fa, setup2FaResult] = useSetup2FaMutation();

	if (isLoading) {
		return <>Loading...</>;
	}

	if (isError) {
		return <>{error.data.message}</>;
	}

	data = data.data;

	const submitForm = async (e) => {
		e.preventDefault();
		const form = e.target;

		try {
			const body = { name: form.name.value };

			if (body.name && body.name.length > 0) {
				const result = await update(body).unwrap();
			}
			return navigate('/profile');
		} catch (err) {
			console.log(err);
		}
	};

	const enableTwoFactor = async () => {
		try {
			const result = await setup2Fa().unwrap();
			console.log(result);
			setTwoFa({ ...result.data });
		} catch (err) {
			console.log(err);
			alert('An error occurred');
		}
	};

	return (
		<>
			<title>Profile | {data.user.name}</title>
			<div className="container">
				<h1>Profile</h1>

				<form onSubmit={submitForm}>
					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input
							type="text"
							name="name"
							id="name"
							className="form-control"
							value={name || data.user.name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>

					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							Submit
						</button>
					</div>
				</form>

				{!data.user.twoFactorEnabled && (
					<>
						<div className="mt-5">
							<button onClick={enableTwoFactor}>
								Enable Two Factor Authentication
							</button>

							{setup2FaResult.isLoading && <ProgressLoader />}
							{setup2FaResult.isError && <>{setup2FaResult.error.message}</>}
							{setup2FaResult.isSuccess && <TwoFaScreen data={twoFa} />}
						</div>
					</>
				)}

				<TeamList />

				{updateResult.isLoading && <ProgressLoader />}
			</div>
		</>
	);
};

export default Profile;
