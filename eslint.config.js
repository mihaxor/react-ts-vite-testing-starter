import globals from 'globals';
import importPlugin from 'eslint-plugin-import'
import reactRefresh from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';
import tsParser from '@typescript-eslint/parser';
import vitest from '@vitest/eslint-plugin';
import eslintJs from '@eslint/js';
import eslintTs from 'typescript-eslint';

export default eslintTs.config([
    eslintJs.configs.recommended,
    eslintTs.configs.recommended,
    eslintTs.configs.recommendedTypeChecked,
    eslintTs.configs.stylistic,
    { ignores: ['build/**/*', 'dist/**/*', 'coverage/**/*', 'public/**/*', 'eslint.config.*', '*.config.ts', 'scripts/*'], },
    {
        plugins: {
            'import/parsers': tsParser,
            'react-hooks': reactHooks,
            'vitest': vitest
        },
        languageOptions: {
            ecmaVersion: 2020,
            globals: {
                ...globals.browser,
                ...vitest.environments.env.globals,
            },
            parser: tsParser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        settings: {
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx'],
            },
            vitest: {
                typecheck: true,
            },
        },
        extends: [
            importPlugin.flatConfigs.recommended,
            importPlugin.flatConfigs.typescript,
            reactRefresh.configs.vite,
            reactHooks.configs.flat.recommended,
            vitest.configs.recommended
        ],
        rules: {
            'import/no-duplicates': 'warn',
            'react-refresh/only-export-components': [
                'warn', { allowConstantExport: true }
            ],
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            '@typescript-eslint/no-floating-promises': 'off',
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/no-misused-promises': 'off',
            'import/no-named-as-default-member': 'off',
            'import/no-unresolved': 'off',
            'no-duplicate-imports': 'error',
            'no-unneeded-ternary': 'error',
            'prefer-object-spread': 'error',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'off',
            'vitest/no-conditional-expect': 'off'
        },
    }]);