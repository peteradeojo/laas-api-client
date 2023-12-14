import { useParams } from 'react-router-dom';
import { useAddTeamMemberMutation, useTeamQuery } from '../../services/teams';
import ProgressLoader from '../../components/Loaders/ProgessLoader';
import { Box, Button, FormLabel, Modal, TextField } from '@mui/material';
import { useState } from 'react';

const TeamMember = ({ m }) => (
	<tr>
		<td>{m.name}</td>
		<td>{m.email}</td>
	</tr>
);

const Team = () => {
	const { id } = useParams();

	const { isLoading, isSuccess, data, isError, error } = useTeamQuery(id);
	const [add, adding] = useAddTeamMemberMutation();

	const [inviting, setInviting] = useState(false);
	const [form, setForm] = useState({
		email: '',
		team: id,
	});

	const sendInvite = async () => {
		try {
			await add(form);
			form.email = '';
			setInviting(false);
			alert('Innvite sent successfully.');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			{isLoading ? (
				<ProgressLoader />
			) : isError ? (
				<p>{error.message}</p>
			) : isSuccess ? (
				<div className="container">
					<h2>{data.name}</h2>

					<Modal open={inviting} onClose={() => setInviting(false)}>
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
							<form
								onSubmit={(e) => {
									e.preventDefault();
									sendInvite();
								}}
							>
								<FormLabel>E-mail Address</FormLabel>
								<br />
								<TextField
									sx={{ width: '100%' }}
									value={form.email}
									type="email"
									onChange={(e) => setForm({ ...form, email: e.target.value })}
								/>
								<br />
								<Button
									type="submit"
									variant="contained"
									disabled={adding.isLoading}
								>
									Submit
								</Button>
							</form>
						</Box>
					</Modal>

					<table className="table">
						<thead>
							<tr>
								<th>Name</th>
								<th>E-mail</th>
							</tr>
						</thead>
						<tbody>
							{data.members.map((m, i) => (
								<TeamMember key={i} m={m} />
							))}
						</tbody>
					</table>

					<div className="py-5"></div>
					<button className="btn" onClick={() => setInviting(true)}>
						Invite Member
					</button>
				</div>
			) : (
				<></>
			)}
		</>
	);
};

export default Team;
