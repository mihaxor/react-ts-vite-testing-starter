# Starter with React + TypeScript + Vitest

## Installing Vitest and React Testing Library in a Vite project

### Install dependencies

```sh
yarn add -D vitest @vitest/ui eslint-plugin-vitest
yarn add -D jsdom @testing-library/jest-dom @testing-library/react
yarn add -D @vitest/coverage-v8
```

## Add test scripts to package.json `test` object

```json
{
  "test": "vitest",
  "test:watch": "vitest --ui",
  "test:coverage": "vitest --coverage"
}
```

## Update TypeScript configuration `tsconfig.json`

```json
  "include": [
    "node_modules/vitest/globals.d.ts"
  ]
```

## Add Vitest plugin to ESLint

```ts
import vitest from 'eslint-plugin-vitest'

export default tseslint.config(
    {
        languageOptions: {
            globals: {
                ...vitest.environments.env.globals
            }
        },
        plugins: {
            vitest
        },
        rules: {
            ...vitest.configs.recommended.rules, // you can also use vitest.configs.all.rules to enable all rules
            'no-unused-vars': 'warn', // warning, not error
            'vitest/expect-expect': 'off', // eliminate distracting red squiggles while writing tests
            'react/prop-types': 'off' // turn off props validation
        }
    }
)
```

## Update vite configuration for tests

Update _vitest.config.js_. Add this property / value to the `defineConfig` argument:

```ts
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
}));
```