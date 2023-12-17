import { useState } from 'react';
import { formatDate } from '../../services/helpers';
import { useCreateTeamMutation, useTeamsQuery } from '../../services/teams';
import ProgressLoader from '../Loaders/ProgessLoader';

import styles from './styles.module.scss';
import { Box, Button, FormLabel, Modal, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

export const TeamRecord = ({ team }) => {
	return (
		<tr>
			<td><Link to={`teams/${team.id}`}>{team.name}</Link></td>
			<td>{formatDate(team.createdAt)}</td>
		</tr>
	);
};

const TeamList = () => {
	const { isLoading, isError, data, error } = useTeamsQuery();
	const [create, creating] = useCreateTeamMutation();
	const [creatingTeam, setCreatingTeam] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
	});

	const newTeam = async (e) => {
		e.preventDefault();
		try {
			await create(formData);
			setFormData({ name: '' });
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="mt-3 pt-5">
			{creating.isLoading && <ProgressLoader />}
			{creatingTeam && (
				<Modal open={creatingTeam} onClose={() => setCreatingTeam(false)}>
					<Box
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							width: '50%',
							bgcolor: 'background.paper',
							boxShadow: 24,
							borderRadius: '6px',
							p: 4,
						}}
					>
						<form onSubmit={newTeam}>
							<FormLabel>Team Name</FormLabel>
							<br />
							<TextField
								value={formData.name}
								onChange={(e) =>
									setFormData({ ...formData, name: e.target.value })
								}
							/>
							<br />
							<Button variant="contained" type="submit">
								Submit
							</Button>
						</form>
					</Box>
				</Modal>
			)}
			<div className="row between">
				<h1>Teams</h1>
				<button className="btn" onClick={() => setCreatingTeam(true)}>
					New Team
				</button>
			</div>
			{isLoading ? (
				<ProgressLoader />
			) : isError ? (
				<p>{error?.message}</p>
			) : (
				<table className={styles.TeamList}>
					<thead>
						<tr>
							<th>Name</th>
							<th>Date created</th>
						</tr>
					</thead>
					<tbody>
						{data.map((team, index) => (
							<TeamRecord key={index} team={team} />
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default TeamList;
