import { useContext } from 'react';
import { TeamContext } from '../../context/TeamContext';
import { Link, useNavigate } from 'react-router-dom';
import { useTeamsQuery } from '../../services/teams';
import styles from './style.module.scss';
import { useGetAppsQuery } from '../../services/api';

const Nav = ({ data, update }) => {
	const team = useContext(TeamContext);
	const appsHook = useGetAppsQuery(team.onTeam);

	const switchTeam = async (e) => {
		team.onTeam = e.target.value != 'false' ? e.target.value : undefined;
		try {
			await appsHook.refetch(team.onTeam);
			update(team.onTeam);
		} catch (error) {
			console.error(error);
		}
	};

	if (data) {
		return (
			<div className={styles.NavArea}>
				{data.length > 0 ? (
					<select onChange={switchTeam}>
						<option value={false}>Select Team</option>
						{data.map((t) => {
							return (
								<option key={t.id} value={t.id}>
									{t.name}
								</option>
							);
						})}
					</select>
				) : (
					<>
						<Link to={'/teams/new'}>Create Team</Link>
					</>
				)}
			</div>
		);
	}

	return <></>;
};

const TopNav = ({ updateTeam }) => {
	const navigate = useNavigate();
	const { isLoading, isError, isFetching, isSuccess, data, error } =
		useTeamsQuery({
			mine: false,
		});

	const team = useContext(TeamContext);

	const back = () => {
		navigate(-1);
	};

	return (
		<div className={styles.TopNav}>
			<button className="btn" onClick={back}>
				Back
			</button>
			{isLoading ? <p>Loading</p> : null}
			{isError ? <p>An error occurred. Unable to fetch data</p> : null}
			{isSuccess ? (
				// <TeamContext.Provider value={team}>
				<Nav data={data} team={data} update={updateTeam} />
			) : (
				// </TeamContext.Provider>
				<>{error}</>
			)}
		</div>
	);
};

export default TopNav;
