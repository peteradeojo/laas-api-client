import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// plugins: [react()],

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		envDir: '.',
		plugins: [react()],
		define: {
			__APP_ENV__: env,
		},
	};
});
