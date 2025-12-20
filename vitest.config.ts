import {defineConfig, mergeConfig} from 'vitest/config'
import {UserConfig} from 'vite';
import viteConfig from './vite.config';

export default mergeConfig(viteConfig as UserConfig, defineConfig({
    test: {
        reporters: ['tree'],
        globals: true,
        environment: 'jsdom',
        pool: 'forks',
        coverage: {
            provider: 'v8',
            enabled: process.env.VITEST_COVERAGE === 'true',
            reportsDirectory: './coverage',
            reporter: ['text', 'html'],
            include: ['src/**/*.{ts,tsx}'],
            exclude: []
        },
        setupFiles: ['src/test/setupTests.ts'],
    }
}));