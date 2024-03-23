import { useEffect } from 'react';

import socket from '../../socket';

const useSocketSetup = (handleMessage, appToken = '') => {
	if (appToken) {
		useEffect(() => {
			socket.connect();

			socket.on('connect', () => {
				if (appToken) socket.emit('connect-log-stream', appToken);
			});

			socket.on('connect_error', (err) => {
				console.log(err);
			});

			socket.on('log', handleMessage);

			return () => {
				socket.off('connect_error');
				socket.off('log');
        socket.emit("closing_stream");
				// socket.disconnect();
        // socket.close();
			};
		}, [appToken]);
	} else {
		useEffect(() => {}, [appToken]);
	}
};

export default useSocketSetup;
