import { useState } from 'react';
import { useGetAppsQuery, useCreateAppMutation } from '../../services/api';

import authStyles from '../Login/styles.module.scss';
import { useNavigate } from 'react-router-dom';

const NewAppForm = ({ refetch }) => {
	const [title, setTitle] = useState('');
	const [createApp, result] = useCreateAppMutation();
	// const navigate = useNavigate();

	const submitForm = async () => {
		const data = await createApp({ title }).unwrap();
		refetch();
	};

	return (
		<>
			<form
				className={authStyles.loginForm}
				onSubmit={(e) => {
					e.preventDefault();
					submitForm();
				}}
			>
				<input
					type="text"
					placeholder="App Name"
					value={title}
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>

				<button type="submit">Submit</button>
			</form>
		</>
	);
};

const Apps = () => {
	const [newAppForm, setNewAppForm] = useState(false);
	const { data, error, isLoading, refetch } = useGetAppsQuery();

	return (
		<>
			<h1>Apps</h1>
			{error && <p>An error occured</p>}
			{isLoading && <p>Loading...</p>}
			{data && data.data.length >= 1 ? (
				<>
					{data.data.map((app) => (
						<div key={app._id}>{app.title}</div>
					))}
				</>
			) : (
				<p>No apps. </p>
			)}
			<button
				onClick={() => {
					setNewAppForm(!newAppForm);
				}}
			>
				Create App
			</button>

			{newAppForm && <NewAppForm refetch={refetch} />}
		</>
	);
};

export default Apps;
