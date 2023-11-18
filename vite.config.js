import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    base: '/react-operator-hub/',
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/tests/setupTest.js',
        threads: false,
    },
})
