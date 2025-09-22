import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

// Use a fixed URL for the backend API, since your backend is confirmed to be running on http://localhost:5138.
const API_URL = 'http://localhost:5138';

const proxyOptions = {
    target: API_URL,
    secure: false,
    changeOrigin: true,
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            // These are the new API endpoints we created.
            '/Events': proxyOptions,
            '/Users': proxyOptions,
            '/Communities': proxyOptions
        },
        port: 5173,
        https: false // Crucially, we are disabling HTTPS to bypass the certificate error.
    }
});
