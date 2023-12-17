import { useState } from 'react';
import { useGetAppLogsQuery } from '../../services/api';

const LogFilterPanel = ({
	appId,
	page = 1,
	count = 20,
	logsHook,
	setLogsFilter,
}) => {
	const [filter, setFilter] = useState({
		level: null,
		search: null,
	});

	const submitForm = async (filter) => {
		setLogsFilter(filter);
		await logsHook.refetch();
	};

	return (
		<div className="container">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					submitForm(filter);
				}}
			>
				<input
					type="text"
					placeholder="Search"
					className="form-control"
					onChange={(e) => setFilter({ ...filter, search: e.target.value })}
				/>
				<div className="row">
					<select
						className="form-control"
						onChange={(e) => {
							const { value } = e.target;
							// console.log(value);
							if (value == 'All') {
								setFilter((prev) => ({ ...prev, level: null }));
								return;
							}

							setFilter((prev) => ({ ...prev, level: value }));
						}}
					>
						<option value={undefined}>All</option>
						<option value="info">Info</option>
						<option value="warn">Warning</option>
						<option value="error">Error</option>
						<option value="fatal">Fatal</option>
						<option value="debug">Debug</option>
						<option value="critical">Critical</option>
					</select>
					<button className="btn">Filter</button>
				</div>
			</form>
		</div>
	);
};

export default LogFilterPanel;
