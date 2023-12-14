export const getAuthToken = () => localStorage.getItem('authToken');

export const prepareHeaders = (headers) => {
	const token = getAuthToken();
	if (token) {
		headers.set('Authorization', `Bearer ${token}`);
	}

	headers.set('Content-type', 'application/json');
	headers.set('Accept', 'application/json');
	return headers;
};

/**
 *
 * @param {Date} date
 */
export const formatDate = (date) => {
	return typeof date == 'string' ? (new Date(date)).toLocaleString() : date.toLocaleString();
};

export const baseUrl = __APP_ENV__.API_URL;
