import { useState } from 'react';
import { useGetAppsQuery, useCreateAppMutation } from '../../services/api';

import authStyles from '../Login/styles.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import AppHeader from '../../components/AppHeader';
import ProgressLoader from '../../components/Loaders/ProgessLoader';

import styles from './style.module.scss';

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
				className={`mt-3 ${authStyles.loginForm}`}
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

				<button className="btn" type="submit">
					Submit
				</button>
			</form>
		</>
	);
};

const Apps = () => {
	const [newAppForm, setNewAppForm] = useState(false);
	const { data, error, isLoading, refetch } = useGetAppsQuery();

	return (
		<div className="container">
			<AppHeader app={{ title: 'Apps' }} />

			{error && <p>An error occured</p>}
			{isLoading && <ProgressLoader />}
			{data && data.data.length >= 1 ? (
				<>
					<table className={styles.appTable}>
						<thead>
							<tr>
								<th>S/N</th>
								<th>Name</th>
								<th>Created</th>
								<th>Status</th>
							</tr>
						</thead>

						<tbody>
							{data.data.map((app, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>
										<Link to={`${app._id}`}>{app.title}</Link>
									</td>
									<td>{app.createdAt}</td>
									<td>{app.token ? 'Active' : 'Inactive'}</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			) : (
				<p>No apps. </p>
			)}
			<button
				onClick={() => {
					setNewAppForm(!newAppForm);
				}}
				className="btn"
			>
				Create App
			</button>

			{newAppForm && <NewAppForm refetch={refetch} />}
		</div>
	);
};

export default Apps;
