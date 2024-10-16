import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import vitest from 'eslint-plugin-vitest'

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended
        ],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: {
                ...globals.browser,
                ...vitest.environments.env.globals
            },
        },
        plugins: {
            vitest,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            ...vitest.configs.recommended.rules, // you can also use vitest.configs.all.rules to enable all rules
            'no-unused-vars': 'warn', // warning, not error
            'vitest/expect-expect': 'off', // eliminate distracting red squiggles while writing tests
            'react/prop-types': 'off', // turn off props validation
        },
    },
)
