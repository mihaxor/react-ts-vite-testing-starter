import globals from 'globals';
import importPlugin from 'eslint-plugin-import'
import reactRefresh from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';
import tsParser from '@typescript-eslint/parser';
import eslintJs from '@eslint/js';
import eslintTs from 'typescript-eslint';
import vitest from '@vitest/eslint-plugin';

export default eslintTs.config([
    eslintJs.configs.recommended,
    eslintTs.configs.recommended,
    { ignores: ['build/**/*', 'coverage/**/*', 'public/**/*'], },
    {
        plugins: {
            import: importPlugin,
            'import/parsers': tsParser,
            'react-refresh': reactRefresh,
            'react-hooks': reactHooks,
            vitest: vitest
        },
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parser: tsParser,
        },
        settings: {
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx'],
            },
        },
        rules: {
            ...importPlugin.configs.typescript.rules,
            ...reactHooks.configs.recommended.rules,
            ...vitest.configs.recommended.rules,
            'import/no-duplicates': 'warn',
            'react-refresh/only-export-components': [
                'warn', { allowConstantExport: true, }
            ],
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            'no-duplicate-imports': 'error',
            'no-unneeded-ternary': 'error',
            'prefer-object-spread': 'error',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn'
        },
    }]);