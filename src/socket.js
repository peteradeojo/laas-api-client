import { io } from 'socket.io-client';

const socket = new io(__APP_ENV__.WS_URL, {
	autoConnect: false,
	// withCredentials: true,
});

export default socket;