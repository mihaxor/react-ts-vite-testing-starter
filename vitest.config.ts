import {defineConfig, mergeConfig} from 'vitest/config'
import {UserConfig} from 'vitest/node';
import viteConfig from './vite.config';

export default mergeConfig(viteConfig as UserConfig, defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        reporters: ['verbose'],
        pool: 'forks'
    }
}))