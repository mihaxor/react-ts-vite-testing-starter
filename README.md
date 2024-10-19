# Starter with React + TypeScript + Vitest

## Installing Vitest and React Testing Library in a Vite project

### Install dependencies

```sh
yarn add -D vitest @vitest/ui eslint-plugin-vitest
```
```sh
yarn add -D jsdom @testing-library/jest-dom@6.0.0 @testing-library/dom @testing-library/react @testing-library/user-event
```
```sh 
yarn add -D @types/jest
```
```sh
yarn add -D @vitest/coverage-v8
```
- *Newer version >= v16 of React Testing Library may require @testing-library/dom*
- *@testing-library/dom is required for the `screen` object in React Testing Library*
- *@testing-library/user-event is required for the `userEvent` for simulating user events*
- *@testing-library/jest-dom v6.0.0 is required for compatibility with `@types/jest` and `Vitest`, as the latest version may not fully support the current TypeScript configuration, potentially causing some documentation methods to be unavailable*

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
"compilerOptions": {
...
"types": ["vitest/globals", "@testing-library/jest-dom"]
}
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
        pool: 'forks',
        setupFiles: ['./vitest-setup.ts']
    }
}));
```
Add setup file for _jest-dom_

```ts
// In your own vitest-setup.ts (or any other name)
import '@testing-library/jest-dom/vitest';
```